import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faEye, faEyeSlash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { DateInLetters } from './Time';
import { parse_username } from '../functions/parsing';
import { send_newsletter_email, send_verification_email } from '../functions/mailing';
import { backend } from '../../../package.json';

const icon_edit = <FontAwesomeIcon icon={faUserEdit} />;
const icon_eye = <FontAwesomeIcon icon={faEye} />;
const icon_eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;
const icon_delete = <FontAwesomeIcon icon={faTrashAlt} />;

const AccountEditor = (props) => 
{
    const history = useHistory();

    const [account_data, set_account_data] = useState(null);
    const [is_edit_open, set_is_edit_open] = useState(false);
    const [is_password_shown, set_is_password_shown] = useState(false);
    const [checkbox_newsletter, set_checkbox_newsletter] = useState(false);

    useEffect(() => set_account_data(props.account_data), [props.account_data]);

    const handle_edit_button = () => 
    {
        is_edit_open ? set_is_edit_open(false) : set_is_edit_open(true);
        set_checkbox_newsletter(false);
    };

    const handle_password_visibility = (e) => 
    {
        e.preventDefault();
        set_is_password_shown(is_password_shown ? false : true);
    };

    const is_username_already_used_by_another_account = async (username) => 
    {
        const res = await fetch(backend + `/user/check/username/${account_data._id}/${username}`);
        const json = await res.json();
        return json;
    };

    const is_email_already_used_by_another_account = async (email) => 
    {
        const res = await fetch(backend + `/user/check/email/${account_data._id}/${email}`);
        const json = await res.json();
        return json;
    };

    const hash_password = async (password) => 
    {
        const res = await fetch(backend + '/user/password',
        {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
            {
                _id: account_data._id,
                password: password
            })
        });

        const json = await res.json();

        return json;
    };

    const update_account = async (e) =>
    {
        const updated_account = {};
        const field_email = e.target[1].value;
        const field_repeat_email = e.target[2].value;
        const field_password = e.target[3].value;
        const field_repeat_password = e.target[4].value;
        let field_username = e.target[0].value;

        let obj_parse_username;
        let username_check;
        let email_check;
        let has_newsletter_changed = false;

        e.preventDefault();

        // Check for whether any field is filled or any button checked, otherwise no update
        if (field_username !== '' || field_email !== '' || field_repeat_email !== '' || field_password !== '' || field_repeat_password !== '' || checkbox_newsletter) 
        {
            if (field_username === '')
                updated_account.username = account_data.username;
            else
            {
                obj_parse_username = parse_username(field_username);
                if (!obj_parse_username.user_approves)
                    return;
                else
                    field_username = obj_parse_username.parsed_username;

                username_check = await is_username_already_used_by_another_account(field_username);
                console.log(username_check.message);
                if (!username_check.is_success)
                {
                    alert(username_check.message);
                    if (username_check.error)
                        console.log(username_check.error);

                    // Return from the function because this username is already used or there's been an error
                    return;
                }

                // This username is allowed
                updated_account.username = field_username;
            }

            if (field_email === '' && field_repeat_email === '')
            {
                updated_account.email_address = account_data.email_address;
            }
            else if (field_email === field_repeat_email)
            {
                email_check = await is_email_already_used_by_another_account(field_email);

                console.log(email_check.message);
                if (!email_check.is_success)
                {
                    alert(email_check.message);
                    if (email_check.error)
                        console.log(email_check.error);

                    // Return from the function because this email is already used or there's been an error
                    return;
                }

                // This email address is allowed
                updated_account.verified_user = false;
                updated_account.email_address = field_email;
            }
            // If they don't match or if only one field is filled, then warning
            else
            {
                alert('The same email address is asked in both fields.');
                return;
            }

            if (field_password === '' && field_repeat_password === '')
            {
                updated_account.hashed_password = account_data.hashed_password;
            }
            else if (field_password === field_repeat_password)
            {
                /* 
                    The function invoked right below updates the password in DB, but doesn't updates our account_data state, 
                    so this time we can't say: updated_account.hashed_password = account_data.hashed_password;

                    But it still works just fine, because we don't need to have all the fields in the updated_account object.
                */
                await hash_password(field_password);
            }   
            // If they don't match or if only one field is filled, then warning
            else
            {
                alert('The same password is asked in both fields.');
                return;
            }

            // Change the status of the newsletter subscription
            if (checkbox_newsletter && (!account_data.newsletter || window.confirm('Are you sure you want to unsubscribe from the newsletter?')))
            {
                updated_account.newsletter = !account_data.newsletter;
                has_newsletter_changed = true;
            }

            await fetch(backend + '/user/update',
            {
                method: 'PUT',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                {
                    _id: account_data._id,
                    updated_account: updated_account
                })
            })
            .then(res => res.json())
            .then(json => 
            {
                console.log(json.message);
                alert(json.message);

                if (json.is_success)
                    props.update_account_data(json.data);

                // The user changed the status of their newsletter subscription, and they're now subscribed
                if (has_newsletter_changed && json.data.newsletter)
                    send_newsletter_email(json.data._id, json.data.email_address, json.data.first_name);
            })
            .catch(err => console.log(err));
        }

        set_is_edit_open(false);
        set_checkbox_newsletter(false);

        // If the email address has been updated, verify it just like we did at account registration
        if (updated_account.verified_user === false)
            send_verification_email(account_data._id, field_email, updated_account.first_name);
    };

    const delete_account = () => 
    {
        if (window.confirm('Are you sure you want to delete your account? This action is irreversible.'))
        {
            set_is_edit_open(false);

            fetch(backend + '/user/delete',
            {
                method: 'DELETE',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_user_to_delete: account_data._id })
            })
            .then(res => res.json())
            .then(json => 
            {
                console.log(json.message);
                alert(json.message);

                if (json.error)
                    console.log(json.error);

                if (json.is_success)
                    history.push('/');
            })
            .catch(err => console.log(err));
        }
    };

    return (
        <>
            <h2 className="sub_title">Profile</h2>
            <section className="block_center">
                <div id="all_account_info">
                    <div>
                        <ul>
                            <li>{account_data?.username}</li>
                            <li>Rank: {account_data?.rank === 1 ? 'Employee' : account_data?.rank === 2 ? 'Moderator' : account_data?.rank === 3 ? 'Administrator' : 'Customer'}</li>
                            <li>Registered on: <DateInLetters raw_time={account_data?.registered_on} /></li>
                            <li>Email address: {account_data?.email_address}</li>
                            <li>{account_data?.newsletter ? 'Subscribed' : 'Not subscribed'} to the newsletter</li>
                        </ul>
                    </div>

                    <button className="button" onClick={handle_edit_button}>{icon_edit} Modify information</button>
                    {!account_data?.is_admin && <button className="button" onClick={delete_account}>{icon_delete} Delete the account</button>}
                </div>

                {is_edit_open && 
                <form onSubmit={update_account} id="account_editor_form">
                    <div className="change">
                        <label htmlFor="change_username">Change your username:</label>
                        <input type="text" name="username" placeholder="Username" autoComplete="new-password" id="change_username" />
                    </div>

                    <div className="change">
                        <label htmlFor="change_email">Change your email address:</label>
                        <input type="email" name="email" placeholder="New email address" autoComplete="new-password" id="change_email" />
                        <input type="email" name="email" placeholder="Repeat the email address" autoComplete="new-password" />
                    </div>

                    <div className="change">
                        <label htmlFor="change_password">Change your password:</label>
                        <div className="field_password">
                            <input type={is_password_shown ? "text" : "password"} name="password" placeholder="New password" autoComplete="new-password" id="change_password" />
                            <span className="btn_eye" onClick={handle_password_visibility}>{is_password_shown ? icon_eye : icon_eye_slash}</span>
                        </div>
                        <div className="field_password">
                            <input type={is_password_shown ? "text" : "password"} name="password" placeholder="Repeat the password" autoComplete="new-password" /> 
                            <span className="btn_eye" onClick={handle_password_visibility}>{is_password_shown ? icon_eye : icon_eye_slash}</span>
                        </div>
                    </div>

                    {!account_data?.is_admin && 
                    <div id="div_checkbox_newsletter">
                        <input type="checkbox" name="checkbox_newsletter" autoComplete="new-password" id="checkbox_newsletter" checked={checkbox_newsletter} 
                            onChange={() => set_checkbox_newsletter(checkbox_newsletter ? false : true)} />
                        <label htmlFor="checkbox_newsletter">{account_data?.newsletter ? ' Unsubscribe from the newsletter' : ' Subscribe to the newsletter'}</label>
                    </div>}

                    <div className="btn_reset_submit">
                        <input type="reset" className="button" value="Cancel" onClick={() => set_checkbox_newsletter(false)} />
                        <input type="submit" className="button" value="Confirm" />
                    </div>
                </form>}
            </section>
        </>
    );
};

export default AccountEditor;

