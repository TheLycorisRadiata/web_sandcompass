import { useState, useLayoutEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../App';
import {
    profile, profile_picture, info_rank, info_registered_on, info_preferred_language, dynamic_language, info_email_address, info_newsletter, 
    btn_delete_account, modify_information, cancel, confirm, 
    disclaimer_profile_picture_size, disclaimer_email, disclaimer_password, confirm_newsletter, confirm_delete_account, 
    change_profile_picture, disclaimer_profile_picture, browse_system_for_profile_picture, drop_profile_picture, url_for_profile_picture, disclaimer_profile_picture_format, 
    change_username, username, change_email, new_email, repeat_email, 
    change_password, new_password, repeat_password, sub_newsletter, 
    change_language, english, french, japanese 
} from '../functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faCheck, faEye, faEyeSlash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { date_in_letters } from '../functions/time';
import { encode_file_into_base64 } from '../functions/file';
import { parse_username } from '../functions/parsing';
import { send_newsletter_email, send_verification_email } from '../functions/mailing';
import default_profile_picture from '../images/placeholder.png';
import package_info from '../../../package.json';

import { Buffer } from 'buffer';
window.Buffer = window.Buffer || require('buffer').Buffer;

const icon_edit = <FontAwesomeIcon icon={faUserEdit} />;
const icon_check = <FontAwesomeIcon icon={faCheck} />;
const icon_eye = <FontAwesomeIcon icon={faEye} />;
const icon_eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;
const icon_delete = <FontAwesomeIcon icon={faTrashAlt} />;

const AccountEditor = (props) => 
{
    const ct = useContext(AppContext);
    const history = useHistory();

    const [is_edit_open, set_is_edit_open] = useState(false);
    const [is_password_shown, set_is_password_shown] = useState(false);
    const [is_profile_picture_selector_open, set_is_profile_picture_selector_open] = useState(false);
    const [url_profile_picture, set_url_profile_picture] = useState('');
    const [checked_lang, set_checked_lang] = useState(props.account_data?.language);
    const [checkbox_newsletter, set_checkbox_newsletter] = useState(false);
    const [profile_picture_source, set_profile_picture_source] = useState(default_profile_picture);
    const [new_profile_picture, set_new_profile_picture] = useState(null);

    useLayoutEffect(() => 
    {
        if (!props.rank)
        {
            fetch(`${package_info.api}/rank/${ct.lang}/${props.account_data?.rank}`)
            .then(res => res.json())
            .then(json => 
            {
                //console.log(json.message);
                //if (json.error)
                    //console.log(json.error);
                if (json.is_success)
                    props.set_rank(json.data);
            });
            //.catch(err => console.log(err));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useLayoutEffect(() => 
    {
        if (props.account_data.profile_picture)
            set_profile_picture_source(Buffer.from(props.account_data.profile_picture).toString('binary'));
    }, [props.account_data.profile_picture]);

    const reset_form = () => 
    {
        set_checkbox_newsletter(false);
        set_checked_lang(props.account_data?.language);
        set_url_profile_picture('');
        set_new_profile_picture(null);
    };

    const handle_edit_button = () => 
    {
        set_is_edit_open(!is_edit_open);
        reset_form();
    };

    // Without this function, the browser will just open the file upon dropping, instead of allowing an actual drop behavior
    const handle_drag_over = (e) => 
    {
        e.preventDefault();
        e.stopPropagation();
    };

    const handle_drop = (e) => 
    {
        const file = e.dataTransfer.items[0].getAsFile();
        const file_extension = file.name.split('.').pop();
        const extension_whitelist = ['png', 'jpg', 'jpeg'];

        e.preventDefault();
        e.stopPropagation();

        if (extension_whitelist.includes(file_extension))
            set_new_profile_picture(file);
    };

    const handle_url_profile_picture = async (e) => 
    {
        const extension_whitelist = ['png', 'jpg', 'jpeg'];
        let url_filename, url_extension, url_datatype, response, data, url_file;

        e.preventDefault();

        if (url_profile_picture === '')
            return;

        // Get the filename to serve as the required second argument to File()
        url_filename = url_profile_picture.split('/').pop();

        // Check the extension
        url_extension = url_filename.split('.').pop();
        if (!extension_whitelist.includes(url_extension))
        {
            ct.popup('alert', ct.lang, disclaimer_profile_picture_format(ct.lang));
            return;
        }

        // Set the datatype variable so it can be added to the file object (by default it's blank)
        url_datatype = url_extension === 'png' ? 'image/png' : 'image/jpeg';

        // Fetch the file
        response = await fetch(url_profile_picture, { mode: 'no-cors' });
        data = await response.blob();
        url_file = new File([data], url_filename, { type: url_datatype });

        // Update the state
        set_new_profile_picture(url_file);
    };

    const cancel_upload_of_new_profile_picture = e => 
    {
        const file_input_field = document.querySelector('input[name="profile_picture"]');

        e.preventDefault();

        // Clear the form
        if (file_input_field)
            file_input_field.value = '';

        // Clear the state
        set_url_profile_picture('');
        set_new_profile_picture(null);
    };

    const is_username_already_used_by_another_account = async (username) => 
    {
        const id_token = document.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)')?.pop() || '';
        const id_account = document.cookie.match('(^|;)\\s*id\\s*=\\s*([^;]+)')?.pop() || '';

        const res = await fetch(`${package_info.api}/user/${ct.lang}/check/username/${props.account_data._id}/${username}/${id_token}/${id_account}`);
        const json = await res.json();
        return json;
    };

    const is_email_already_used_by_another_account = async (email) => 
    {
        const id_token = document.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)')?.pop() || '';
        const id_account = document.cookie.match('(^|;)\\s*id\\s*=\\s*([^;]+)')?.pop() || '';

        const res = await fetch(`${package_info.api}/user/${ct.lang}/check/email/${props.account_data._id}/${email}/${id_token}/${id_account}`);
        const json = await res.json();
        return json;
    };

    const hash_password = async (password) => 
    {
        const res = await fetch(`${package_info.api}/user/${ct.lang}/password`,
        {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
            {
                id_token: decodeURIComponent(document.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)')?.pop() || ''),
                id_account: decodeURIComponent(document.cookie.match('(^|;)\\s*id\\s*=\\s*([^;]+)')?.pop() || ''),
                email_address: props.account_data.email_address,
                password: password
            })
        });

        const json = await res.json();
        return json;
    };

    const update_account = async (e) =>
    {
        const updated_account = {};
        let field_username = e.target[0].value;
        let field_email = e.target[1].value;
        let field_repeat_email = e.target[2].value;
        let field_password = e.target[3].value;
        let field_repeat_password = e.target[4].value;

        let profile_picture_size_in_mb;
        let obj_parse_username;
        let username_check;
        let email_check;
        let has_newsletter_changed = false;

        e.preventDefault();

        if (is_profile_picture_selector_open)
        {
            // "e.target[0]" is the file input, the "new_profile_picture" state is used instead in order for the drag & drop feature to work
            // "e.target[1]" is the url input
            // "e.target[2]" is the button for the url input
            field_username = e.target[3].value;
            field_email = e.target[4].value;
            field_repeat_email = e.target[5].value;
            field_password = e.target[6].value;
            field_repeat_password = e.target[7].value;
        }

        // Check for whether any field is filled or any button checked, otherwise no update
        if (new_profile_picture || field_username !== '' || field_email !== '' || field_repeat_email !== '' || field_password !== '' || field_repeat_password !== '' 
            || props.account_data.language !== checked_lang || checkbox_newsletter) 
        {
            updated_account.verified_user = props.account_data.verified_user;

            if (new_profile_picture)
            {
                // "Size / 1000" is size in Kb, and 1 Mb is 1000 Kb, which is the max recommended size
                profile_picture_size_in_mb = (new_profile_picture.size / 1000) / 1000;

                if (profile_picture_size_in_mb <= 1)
                    updated_account.profile_picture = await encode_file_into_base64(new_profile_picture);
                else
                {
                    ct.popup('alert', ct.lang, disclaimer_profile_picture_size(ct.lang, profile_picture_size_in_mb));
                    return;
                }
            }

            if (field_username === '')
                updated_account.username = props.account_data.username;
            else
            {
                obj_parse_username = parse_username(ct.lang, field_username);
                if (!obj_parse_username.user_approves)
                    return;
                else
                    field_username = obj_parse_username.parsed_username;

                username_check = await is_username_already_used_by_another_account(field_username);
                //console.log(username_check.message);
                if (!username_check.is_success)
                {
                    ct.popup('alert', ct.lang, username_check.message);
                    //if (username_check.error)
                        //console.log(username_check.error);

                    // Return from the function because this username is already used or there's been an error
                    return;
                }

                // This username is allowed
                updated_account.username = field_username;
            }

            if (field_email === '' && field_repeat_email === '')
            {
                updated_account.email_address = props.account_data.email_address;
            }
            else if (field_email === field_repeat_email)
            {
                email_check = await is_email_already_used_by_another_account(field_email);

                //console.log(email_check.message);
                if (!email_check.is_success)
                {
                    ct.popup('alert', ct.lang, email_check.message);
                    //if (email_check.error)
                        //console.log(email_check.error);

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
                ct.popup('alert', ct.lang, disclaimer_email(ct.lang));
                return;
            }

            if (field_password === '' && field_repeat_password === '')
            {
                updated_account.hashed_password = props.account_data.hashed_password;
            }
            else if (field_password !== '' && field_password === field_repeat_password)
            {
                /* 
                    The function invoked right below updates the password in DB, but doesn't updates our account_data state, 
                    so this time we can't say: updated_account.hashed_password = props.account_data.hashed_password;

                    But it still works just fine, because we don't need to have all the fields in the updated_account object.
                */
                await hash_password(field_password);
            }   
            // If they don't match or if only one field is filled, then warning
            else
            {
                ct.popup('alert', ct.lang, disclaimer_password(ct.lang));
                return;
            }

            // Change the preferred language
            updated_account.language = checked_lang;

            // Change the status of the newsletter subscription
            if (checkbox_newsletter && (!props.account_data.newsletter || await ct.popup('confirm', ct.lang, confirm_newsletter(ct.lang))))
            {
                updated_account.newsletter = !props.account_data.newsletter;
                has_newsletter_changed = true;
            }
            else
                updated_account.newsletter = props.account_data.newsletter;

            console.log(updated_account.profile_picture);

            await fetch(`${package_info.api}/user/${ct.lang}/update`,
            {
                method: 'PUT',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                {
                    id_token: decodeURIComponent(document.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)')?.pop() || ''),
                    id_account: decodeURIComponent(document.cookie.match('(^|;)\\s*id\\s*=\\s*([^;]+)')?.pop() || ''),
                    _id: props.account_data._id,
                    updated_account: updated_account
                })
            })
            .then(res => res.json())
            .then(json => 
            {
                //console.log(json.message);
                ct.popup('alert', ct.lang, json.message);

                if (json.is_success)
                {
                    props.set_account_data(json.data);
                    ct.set_lang(json.data.language);
                }

                // The user changed the status of their newsletter subscription, and they're now subscribed
                if (has_newsletter_changed && json.data.newsletter)
                    send_newsletter_email(ct, json.data._id, json.data.email_address);
            });
            //.catch(err => console.log(err));
        }
        
        set_is_edit_open(false);
        reset_form();

        // If the email address has been updated, verify it just like we did at account registration
        if (updated_account.verified_user === false)
            send_verification_email(ct, props.account_data._id, field_email, updated_account.username);
    };

    const delete_account = async () => 
    {
        if (await ct.popup('confirm', ct.lang, confirm_delete_account(ct.lang)))
        {
            set_is_edit_open(false);

            fetch(`${package_info.api}/user/${ct.lang}/delete`,
            {
                method: 'DELETE',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                {
                    id_token: decodeURIComponent(document.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)')?.pop() || ''),
                    id_account: decodeURIComponent(document.cookie.match('(^|;)\\s*id\\s*=\\s*([^;]+)')?.pop() || ''),
                    id_user_to_delete: props.account_data._id
                })
            })
            .then(res => res.json())
            .then(json => 
            {
                //console.log(json.message);
                ct.popup('alert', ct.lang, json.message);

                //if (json.error)
                    //console.log(json.error);

                if (json.is_success)
                {
                    props.set_is_access_granted(false);
                    props.set_account_data(null);
                    props.set_rank(null);
                    history.push('/');
                }
            });
            //.catch(err => console.log(err));
        }
    };

    return (
        <section>
            <h2 className="sub_title">{profile(ct.lang)}</h2>
            <div id="all_account_info">
                <div>
                    <ul>
                        <li>{props.account_data?.username}</li>
                        <li><img src={profile_picture_source} alt={profile_picture(ct.lang)} /></li>
                        <li>{info_rank(ct.lang, props.rank?.name[ct.lang] ?? '')}</li>
                        <li>{info_registered_on(ct.lang)}{date_in_letters(ct.lang, props.account_data?.registered_on)}</li>
                        <li>{info_preferred_language(ct.lang)}{dynamic_language(ct.lang, props.account_data?.language)}</li>
                        <li>{info_email_address(ct.lang)}{props.account_data?.email_address}</li>
                        <li>{info_newsletter(ct.lang, props.account_data?.newsletter)}</li>
                    </ul>
                </div>

                {!props.account_data?.is_admin && <button className="button" onClick={delete_account}><span className="icon">{icon_delete}</span> {btn_delete_account(ct.lang)}</button>}
                <button className="button" onClick={handle_edit_button}><span className="icon">{icon_edit}</span> {modify_information(ct.lang)}</button>
            </div>

            {is_edit_open && 
            <form onSubmit={update_account} id="account_editor_form">
                <div className="change" id="profile_picture_selector">
                    <label htmlFor="change_profile_picture" onClick={() => set_is_profile_picture_selector_open(!is_profile_picture_selector_open)}>{change_profile_picture(ct.lang)}</label>

                    {is_profile_picture_selector_open &&
                    <>
                        <p id="disclaimer_profile_picture">{disclaimer_profile_picture(ct.lang)}</p>

                        <label htmlFor="browse_system" className="button">{browse_system_for_profile_picture(ct.lang)}</label>
                        <input type="file" name="profile_picture" accept=".jpg, .jpeg, .png" onChange={e => set_new_profile_picture(e.target.files[0])} id="browse_system" style={{ display: 'none' }} />

                        <div id="drop_zone" onDrop={handle_drop} onDragOver={handle_drag_over}>
                            <p>{drop_profile_picture(ct.lang)}</p>
                        </div>

                        <div id="url_profile_picture">
                            <input type="text" name="url_profile_picture_selector" placeholder={url_for_profile_picture(ct.lang)} 
                                value={url_profile_picture} onChange={e => set_url_profile_picture(e.target.value)} />
                            <button className="button" onClick={handle_url_profile_picture}><span className="icon">{icon_check}</span></button>
                        </div>
                    </>}

                    {new_profile_picture && <p id="new_profile_picture">{new_profile_picture.name}
                        <button className="button" onClick={cancel_upload_of_new_profile_picture}><span className="icon">{icon_delete}</span></button></p>}
                </div>

                <div className="change">
                    <label htmlFor="change_username">{change_username(ct.lang)}</label>
                    <input type="text" name="username" placeholder={username(ct.lang)} autoComplete="new-password" id="change_username" />
                </div>

                <div className="change">
                    <label htmlFor="change_email">{change_email(ct.lang)}</label>
                    <input type="email" name="email" placeholder={new_email(ct.lang)} autoComplete="new-password" id="change_email" />
                    <input type="email" name="email" placeholder={repeat_email(ct.lang)} autoComplete="new-password" />
                </div>

                <div className="change">
                    <label htmlFor="change_password">{change_password(ct.lang)}</label>
                    <div className="field_password">
                        <input type={is_password_shown ? "text" : "password"} name="password" placeholder={new_password(ct.lang)} autoComplete="new-password" id="change_password" />
                        <span className={is_password_shown ? "btn_eye_open" : "btn_eye_closed"} onClick={() => set_is_password_shown(!is_password_shown)}>{is_password_shown ? icon_eye : icon_eye_slash}</span>
                    </div>
                    <div className="field_password">
                        <input type={is_password_shown ? "text" : "password"} name="password" placeholder={repeat_password(ct.lang)} autoComplete="new-password" /> 
                        <span className={is_password_shown ? "btn_eye_open" : "btn_eye_closed"} onClick={() => set_is_password_shown(!is_password_shown)}>{is_password_shown ? icon_eye : icon_eye_slash}</span>
                    </div>
                </div>

                <div className="change">
                    <label>{change_language(ct.lang)}</label>
                    <div>
                        <div className="div_pointer">
                            <input type="radio" name="language" value="0" id="eng" checked={checked_lang === 0} onChange={() => set_checked_lang(0)} />
                            <label htmlFor="eng">{english(ct.lang)}</label>
                        </div>
                        <div className="div_pointer">
                            <input type="radio" name="language" value="1" id="fr" checked={checked_lang === 1} onChange={() => set_checked_lang(1)} />
                            <label htmlFor="fr">{french(ct.lang)}</label>
                        </div>
                        <div className="div_pointer">
                            <input type="radio" name="language" value="2" id="jp" checked={checked_lang === 2} onChange={() => set_checked_lang(2)} />
                            <label htmlFor="jp">{japanese(ct.lang)}</label>
                        </div>
                    </div>
                </div>

                {!props.account_data?.is_admin && 
                <div className="div_pointer">
                    <input type="checkbox" name="checkbox_newsletter" autoComplete="new-password" id="checkbox_newsletter" checked={checkbox_newsletter} 
                        onChange={() => set_checkbox_newsletter(!checkbox_newsletter)} />
                    <label htmlFor="checkbox_newsletter">{sub_newsletter(ct.lang, props.account_data?.newsletter)}</label>
                </div>}

                <div>
                    <input type="reset" className="button" value={cancel(ct.lang)} onClick={reset_form} />
                    <input type="submit" className="button" value={confirm(ct.lang)} />
                </div>
            </form>}
        </section>
    );
};

export default AccountEditor;

