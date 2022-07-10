import { useContext } from 'react';
import { AppContext } from '../../App';
import {
    social_media, 
    logo_youtube, logo_github, logo_reddit, 
    my_youtube, my_github, my_reddit 
} from '../functions/lang';
import Logo_YouTube from '../images/logos/youtube.png';
import Logo_GitHub from '../images/logos/github.png';
import Logo_Reddit from '../images/logos/reddit.png';

const SocialMedia = () => 
{
    const ct = useContext(AppContext);

    return (
        <section id="social_media">
            <h2 className="sub_title">{social_media(ct.lang)}</h2>
            <ul>
                <li className="logo">
                    <a href="https://www.youtube.com/channel/UCowO_RtloSQ3qnKmvymsBRA" rel="noreferrer" target="_blank">
                        <img src={Logo_YouTube} alt={logo_youtube(ct.lang)} title={my_youtube(ct.lang)} /></a>
                </li>
                <li className="logo">
                    <a href="https://github.com/thelycorisradiata" rel="noreferrer" target="_blank">
                        <img src={Logo_GitHub} alt={logo_github(ct.lang)} title={my_github(ct.lang)} /></a>
                </li>
                <li className="logo">
                    <a href="https://www.reddit.com/user/thelycorisradiata" rel="noreferrer" target="_blank">
                        <img src={Logo_Reddit} alt={logo_reddit(ct.lang)} title={my_reddit(ct.lang)} /></a>
                </li>
            </ul>
        </section>
    );
};

export default SocialMedia;

