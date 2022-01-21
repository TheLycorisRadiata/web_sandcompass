import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { backend } from '../../../package.json';

const icon_lock = <FontAwesomeIcon icon={faUserLock} />;
const icon_fetch = <FontAwesomeIcon icon={faRedoAlt} />;

const Stats = (props) => 
{
    const [stats, set_stats] = useState(null);

    const handle_click = e => 
    {
        e.preventDefault();

        fetch(backend + '/user/stats/all')
        .then(res => res.json())
        .then(json => 
        {
            console.log(json.message);
            if (json.error)
                console.log(json.error);
            alert(json.message);

            if (json.is_success)
                set_stats(json.data);
        })
        .catch(err => console.log(err));
    };

    return (
        <main>
            <h1 className="title">Statistics</h1>
            {!props.is_access_granted ? 
                <p className="txt_access_denied"><span className="icon lock">{icon_lock}</span> Access denied.</p>
            :
            <div id="stats">
                <button className="button" title="Refresh stats" onClick={handle_click}><span className="icon">{icon_fetch}</span></button>

                <ul>
                    {!stats ? 
                    <>
                        <li>Click to get the stats</li>
                        <li>Note that the administrator is not counted</li>
                    </>
                    : !stats.accounts.verified_user ? 
                    <>
                        <li><strong>Verified users:</strong> 0/{stats.accounts.total}.</li>
                        <li><strong>Newsletter subscribers:</strong> {stats.accounts.newsletter}.</li>
                        <li><strong>English preferring users:</strong> {stats.accounts.language.english}.</li>
                        <li><strong>French preferring users:</strong> {stats.accounts.language.french}.</li>
                        <li><strong>Japanese preferring users:</strong> {stats.accounts.language.japanese}.</li>
                    </>
                    :
                    <>
                        <li title={stats.accounts.verified_user * 100 / stats.accounts.total + '% of all users'}>
                            <strong>Verified users:</strong> {stats.accounts.verified_user}/{stats.accounts.total}.</li>
                        <li title={stats.accounts.newsletter * 100 / stats.accounts.verified_user + '% of verified users'}>
                            <strong>Newsletter subscribers:</strong> {stats.accounts.newsletter}.</li>
                        <li title={stats.accounts.language.english * 100 / stats.accounts.verified_user + '% of verified users'}>
                            <strong>English preferring users:</strong> {stats.accounts.language.english}.</li>
                        <li title={stats.accounts.language.french * 100 / stats.accounts.verified_user + '% of verified users'}>
                            <strong>French preferring users:</strong> {stats.accounts.language.french}.</li>
                        <li title={stats.accounts.language.japanese * 100 / stats.accounts.verified_user + '% of verified users'}>
                            <strong>Japanese preferring users:</strong> {stats.accounts.language.japanese}.</li>
                    </>}
                </ul>
            </div>}
        </main>
    );
};

export default Stats;

