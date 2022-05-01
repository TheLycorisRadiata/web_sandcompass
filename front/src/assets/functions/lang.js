import package_info from '../../../package.json';

/* ACCESS DENIED & LANGUAGES -------------------------------------------------------------------- */

export const access_denied = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Accès refusé.';
        case 2:
            return 'Access denied.';
        default:
            return 'Access denied.';
    }
};

export const dynamic_language = (lang, index) => 
{
    switch (index)
    {
        case 1:
            return french(lang);
        case 2:
            return japanese(lang);
        default:
            return english(lang);
    }
};

export const dynamic_language_short = (lang, index) => 
{
    switch (index)
    {
        case 1:
            return 'fr';
        case 2:
            return 'jp';
        default:
            return 'eng';
    }
};

export const index_to_language_code = (index) => 
{
    switch (index)
    {
        case 1:
            return 'fr';
        case 2:
            return 'ja';
        default:
            return 'en';
    }
};

export const language_code_to_index = (lang_code) => 
{
    switch (lang_code)
    {
        case 'fr':
            return 1;
        case 'ja':
            return 2;
        default:
            return 0;
    }
};

export const english = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Anglais';
        case 2:
            return '英語';
        default:
            return 'English';
    }
};

export const french = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Français';
        case 2:
            return 'フランス語';
        default:
            return 'French';
    }
};

export const japanese = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Japonais';
        case 2:
            return '日本語';
        default:
            return 'Japanese';
    }
};

/* PUNCTUATION ---------------------------------------------------------------------------------- */

export const dot = (lang) => 
{
    switch (lang)
    {
        case 2:
            return '。';
        default:
            return '.';
    }
};

export const comma_and_space = (lang) => 
{
    switch (lang)
    {
        case 2:
            return '、';
        default:
            return ', ';
    }
};

/* APP.JS AND DERIVED TITLES -------------------------------------------------------------------- */

export const sign_up = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'S\'inscrire';
        case 2:
            return 'サインアップ';
        default:
            return 'Sign Up';
    }
};

export const log_in = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Se connecter';
        case 2:
            return 'ログイン';
        default:
            return 'Log In';
    }
};

export const log_out = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Se déconnecter';
        case 2:
            return 'ログアウト';
        default:
            return 'Log Out';
    }
};

export const home = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Accueil';
        case 2:
            return 'ホーム';
        default:
            return 'Home';
    }
};

export const faq_short = (lang) => 
{
    return 'FAQ';
};

export const faq_long = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Foire aux questions';
        case 2:
            return 'よくあるご質問';
        default:
            return 'Frequently Asked Questions';
    }
};

export const works = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Œuvres';
        case 2:
            return '作品';
        default:
            return 'Works';
    }
};

export const blog = (lang) => 
{
    switch (lang)
    {
        case 2:
            return 'ブログ';
        default:
            return 'Blog';
    }
};

export const contact = (lang) => 
{
    switch (lang)
    {
        case 2:
            return '連絡';
        default:
            return 'Contact';
    }
};

export const licenses = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Licences';
        case 2:
            return 'ライセンス';
        default:
            return 'Licenses';
    }
};

export const legal_notices = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Mentions légales';
        case 2:
            return '法的通知';
        default:
            return 'Legal Notices';
    }
};

export const control_panel = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Panneau de configuration';
        case 2:
            return 'コントロールパネル';
        default:
            return 'Control Panel';
    }
};

export const copyright = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Lycoris Radiata © 2022 Tous droits réservés';
        default:
            return 'Lycoris Radiata © 2022 All Rights Reserved';
    }
};

/* FAQ & FAQ EDITOR ----------------------------------------------------------------------------- */

export const ask_question = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Poser une question';
        case 2:
            return '質問を聞く';
        default:
            return 'Ask a question';
    }
};

export const faq_is_empty = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'La FAQ est vide.';
        case 2:
            return 'FAQは空っぽです。';
        default:
            return 'The FAQ is empty.';
    }
};

export const question = (lang) => 
{
    switch (lang)
    {
        case 2:
            return '質問';
        default:
            return 'Question';
    }
};

export const answer = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Réponse';
        case 2:
            return '答え';
        default:
            return 'Answer';
    }
};

export const question_eng = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Question (Anglais)';
        case 2:
            return '質問（英語）';
        default:
            return 'Question (English)';
    }
};

export const answer_eng = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Réponse (Anglais)';
        case 2:
            return '答え（英語）';
        default:
            return 'Answer (English)';
    }
};

export const question_fr = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Question (Français)';
        case 2:
            return '質問（フランス語）';
        default:
            return 'Question (French)';
    }
};

export const answer_fr = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Réponse (Français)';
        case 2:
            return '答え（フランス語）';
        default:
            return 'Answer (French)';
    }
};

export const question_jp = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Question (Japonais)';
        case 2:
            return '質問（日本語）';
        default:
            return 'Question (Japanese)';
    }
};

export const answer_jp = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Réponse (Japonais)';
        case 2:
            return '答え（日本語）';
        default:
            return 'Answer (Japanese)';
    }
};

export const add_question = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Ajouter une nouvelle question';
        case 2:
            return 'Add a new question';
        default:
            return 'Add a new question';
    }
};

export const edit_question = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Éditer la question';
        case 2:
            return 'Edit the question';
        default:
            return 'Edit the question';
    }
};

export const edit_answer = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Éditer la réponse';
        case 2:
            return 'Edit the answer';
        default:
            return 'Edit the answer';
    }
};

export const delete_question = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Supprimer la question';
        case 2:
            return 'Delete the question';
        default:
            return 'Delete the question';
    }
};

export const confirm_delete_question = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Êtes-vous sûr(e) de vouloir supprimer la question ?';
        case 2:
            return 'Are you sure you want to delete the question?';
        default:
            return 'Are you sure you want to delete the question?';
    }
};

/* PARSING -------------------------------------------------------------------------------------- */

export const username_disclaimer = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Les pseudos ne peuvent pas avoir d\'espaces ni certains caractères spéciaux.';
        case 2:
            return 'Usernames cannot have spaces nor certain special characters.';
        default:
            return 'Usernames cannot have spaces nor certain special characters.';
    }
};

export const username_disclaimer_and_display = (lang, parsed_username) => 
{
    switch (lang)
    {
        case 1:
            return `Les pseudos ne peuvent pas avoir d'espaces ni certains caractères spéciaux. "${parsed_username}" vous convient-il ?`;
        case 2:
            return `Usernames cannot have spaces nor certain special characters. Does "${parsed_username}" suit you?`;
        default:
            return `Usernames cannot have spaces nor certain special characters. Does "${parsed_username}" suit you?`;
    }
};

/* MAILING -------------------------------------------------------------------------------------- */

export const confirm_resend_verification_email = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Souhaitez-vous recevoir l\'email de vérification à nouveau ?';
        case 2:
            return 'Do you wish for the verification email to be sent again?'
        default:
            return 'Do you wish for the verification email to be sent again?'
    }
};

/* SOCIAL MEDIA --------------------------------------------------------------------------------- */

export const social_media = (lang) =>
{
    switch (lang)
    {
        case 1:
            return 'Réseaux sociaux';
        case 2:
            return 'ソーシャルメディア';
        default:
            return 'Social Media';
    }
};

export const logo_youtube = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Logo YouTube';
        case 2:
            return '「ユーチューブ」ロゴ';
        default:
            return 'YouTube logo';
    }
};

export const logo_github = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Logo GitHub';
        case 2:
            return '「ギットハブ」ロゴ';
        default:
            return 'GitHub logo';
    }
};

export const logo_reddit = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Logo Reddit';
        case 2:
            return '「レディット」ロゴ';
        default:
            return 'Reddit logo';
    }
};

export const my_youtube = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Ma chaîne YouTube';
        case 2:
            return '自分の「ユーチューブ」チャンネル';
        default:
            return 'My YouTube channel';
    }
};

export const my_github = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Mon compte GitHub';
        case 2:
            return '自分の「ギットハブ」アカウント';
        default:
            return 'My GitHub account';
    }
};

export const my_reddit = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Mon compte Reddit';
        case 2:
            return '自分の「レディット」アカウント';
        default:
            return 'My Reddit account';
    }
};

/* QUESTIONNAIRE -------------------------------------------------------------------------------- */

export const error_questionnaire = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Le questionnaire a rencontré une erreur.';
        case 2:
            return 'An error occured with the questionnaire.';
        default:
            return 'An error occured with the questionnaire.';
    }
};

export const try_again = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Re-essayer';
        case 2:
            return 'もう一回';
        default:
            return 'Try again';
    }
};

export const redo = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Refaire';
        case 2:
            return 'やり直す';
        default:
            return 'Redo';
    }
};

export const next_question = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Question suivante';
        case 2:
            return '次の質問';
        default:
            return 'Next question';
    }
};

/* ARTICLES BY AUTHOR --------------------------------------------------------------------------- */

export const title_articles = (lang) => 
{
    switch (lang)
    {
        case 2:
            return '記事';
        default:
            return 'Articles';
    }
};

export const refresh_list = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Actualiser la liste';
        case 2:
            return 'Refresh list';
        default:
            return 'Refresh list';
    }
};

export const articles_by_author_instruction = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Cliquez pour la liste des articles que vous avez écrits';
        case 2:
            return 'Click for the list of articles you wrote';
        default:
            return 'Click for the list of articles you wrote';
    }
};

export const nbr_articles = (lang, nbr) => 
{
    switch (lang)
    {
        case 2:
            return '' + nbr + 'つの記事'
        default:
            return '' + nbr + ' ' + (nbr < 2 ? 'article' : 'articles');
    }
};

export const show_empty_categories = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Afficher les catégories vides';
        case 2:
            return 'Show empty categories';
        default:
            return 'Show empty categories';
    }
};

export const empty = (lang) => 
{
    switch (lang)
    {
        case 1:
            return '[Vide]';
        case 2:
            return '[ 空っぽ ]';
        default:
            return '[Empty]';
    }
};

/* ACCOUNT EDITOR ------------------------------------------------------------------------------- */

export const profile = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Profil';
        case 2:
            return 'プロファイル';
        default:
            return 'Profile';
    }
};

export const info_rank = (lang, rank) => 
{
    switch (lang)
    {
        case 1:
            return 'Grade : ' + rank;
        case 2:
            return 'ランク：　' + rank;
        default:
            return 'Rank: ' + rank;
    }
};

export const info_registered_on = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Inscrit(e) le : ';
        case 2:
            return 'Registered on: ';
        default:
            return 'Registered on: ';
    }
};

export const info_preferred_language = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Langue de préférence : ';
        case 2:
            return 'Preferred language: ';
        default:
            return 'Preferred language: ';
    }
};

export const info_email_address = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Adresse email : ';
        case 2:
            return 'メールアドレス：　';
        default:
            return 'Email address: ';
    }
};

export const info_newsletter = (lang, newsletter) => 
{
    switch (lang)
    {
        case 1:
            return (newsletter ? 'Abonné(e)' : 'Non abonné(e)') + ' à la newsletter';
        case 2:
            return (newsletter ? 'Subscribed' : 'Not subscribed') + ' to the newsletter';
        default:
            return (newsletter ? 'Subscribed' : 'Not subscribed') + ' to the newsletter';
    }
};

export const btn_delete_account = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Supprimer le compte';
        case 2:
            return 'アカウントを消す';
        default:
            return 'Delete the account';
    }
};

export const modify_information = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Modifier les informations';
        case 2:
            return 'Modify information';
        default:
            return 'Modify information';
    }
};

export const cancel = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Annuler';
        case 2:
            return '取り消す';
        default:
            return 'Cancel';
    }
};

export const confirm = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Valider';
        case 2:
            return '確認する';
        default:
            return 'Confirm';
    }
};

export const no = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Non';
        case 2:
            return 'いいえ';
        default:
            return 'No';
    }
};

export const yes = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Oui';
        case 2:
            return 'はい';
        default:
            return 'Yes';
    }
};

export const change_username = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Changer votre pseudo';
        case 2:
            return 'Change your username';
        default:
            return 'Change your username';
    }
};

export const username = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Pseudo';
        case 2:
            return 'Username';
        default:
            return 'Username';
    }
};

export const change_email = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Changer votre adresse email';
        case 2:
            return 'Change your email address';
        default:
            return 'Change your email address';
    }
};

export const new_email = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Nouvelle adresse email';
        case 2:
            return 'New email address';
        default:
            return 'New email address';
    }
};

export const repeat_email = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Répétez l\'adresse email';
        case 2:
            return 'Repeat the email address';
        default:
            return 'Repeat the email address';
    }
};

export const change_password = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Changer votre mot de passe';
        case 2:
            return 'Change your password';
        default:
            return 'Change your password';
    }
};

export const new_password = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Nouveau mot de passe';
        case 2:
            return 'New password';
        default:
            return 'New password';
    }
};

export const repeat_password = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Répétez le mot de passe';
        case 2:
            return 'Repeat the password';
        default:
            return 'Repeat the password';
    }
};

export const change_language = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Changer votre langue de préférence';
        case 2:
            return 'Change your preferred language';
        default:
            return 'Change your preferred language';
    }
};

export const sub_newsletter = (lang, newsletter) => 
{
    switch (lang)
    {
        case 1:
            return newsletter ? 'Se désabonner de la newsletter' : 'S\'abonner à la newsletter';
        case 2:
            return newsletter ? 'Unsubscribe from the newsletter' : 'Subscribe to the newsletter';
        default:
            return newsletter ? 'Unsubscribe from the newsletter' : 'Subscribe to the newsletter';
    }
};

export const disclaimer_email = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'La même adresse email est demandée dans les deux champs.';
        case 2:
            return 'The same email address is asked in both fields.';
        default:
            return 'The same email address is asked in both fields.';
    }
};

export const disclaimer_password = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Le même mot de passe est demandé dans les deux champs.';
        case 2:
            return 'The same password is asked in both fields.';
        default:
            return 'The same password is asked in both fields.';
    }
};

export const confirm_newsletter = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Êtes-vous sûr(e) de vouloir vous désabonner de la newsletter ?';
        case 2:
            return 'Are you sure you want to unsubscribe from the newsletter?';
        default:
            return 'Are you sure you want to unsubscribe from the newsletter?';
    }
};

export const confirm_delete_account = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Êtes-vous sûr(e) de vouloir supprimer votre compte ? Cette action est irréversible.';
        case 2:
            return 'Are you sure you want to delete your account? This action is irreversible.';
        default:
            return 'Are you sure you want to delete your account? This action is irreversible.';
    }
};

/* PAGE NOT FOUND ------------------------------------------------------------------------------- */

export const title_page_not_found = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Page introuvable';
        case 2:
            return 'Page Not Found';
        default:
            return 'Page Not Found';
    }
};

export const msg_page_not_found = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Je suis désolée, cette page n\'existe pas.';
        case 2:
            return 'I\'m sorry, this page doesn\'t exist.';
        default:
            return 'I\'m sorry, this page doesn\'t exist.';
    }
};

/* COSMIC DUST ---------------------------------------------------------------------------------- */

export const link_to_cosmic_dust_cover = (lang) => 
{
    switch (lang)
    {
        case 1:
            return `${package_info.homepage}/static/media/cover_fr.a3f591679c834a0709f9.png`;
        case 2:
            return `${package_info.homepage}/static/media/cover_jp.01296dd65ef33472a721.png`;
        default:
            return `${package_info.homepage}/static/media/cover_eng.36a3c50eac5183cca9f3.png`;
    }
};

export const title_cosmic_dust = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Une Poussière du cosmos';
        case 2:
            return '宇宙塵';
        default:
            return 'Cosmic Dust';
    }
};

export const catch_phrase_cosmic_dust = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Le besoin de création de Zekharia est-il la preuve qu\'il est malade, ou est-il des rares personnes qui fonctionnent correctement ?';
        case 2:
            return 'Is Zekharia\'s urge to create the proof of his sickness, or is he one of the few who function properly?';
        default:
            return 'Is Zekharia\'s urge to create the proof of his sickness, or is he one of the few who function properly?';
    }
};

export const summary_cosmic_dust = (lang) => 
{
    switch (lang)
    {
        case 1:
            return [
                'Zekharia Bettelheim est un citoyen sans prétention de la Société des Arches, un vaisseau spatial à la recherche d\'une nouvelle planète. Souffrant, il tente de trouver une explication à son mal-être et se fait pour cela aider du personnage qu\'il a créé. Son ami imaginaire l\'aide à mettre de l\'ordre dans ses idées, mais il sait qu\'il devra un jour faire appel à une vraie personne.', 

                'Un concours de circonstances l\'amène à contacter un ancien camarade de classe qui, à l\'inverse de Zekharia, a l\'air de s\'épanouir dans leur petit monde et d\'avoir tout pour lui. Cet homme peut devenir l\'ami dont il a besoin, mais encore faut-il s\'assurer qu\'il soit digne de confiance.', 

                'Il y a bien une différence entre une création que l\'on connaît et un être humain, qui garde toujours une part de mystère et qui est donc capable de trahison. Dans un monde érigeant l\'utile en dogme, il est difficile d\'avouer à quiconque que l\'art nous fait tenir au quotidien, d\'autant plus quand il s\'agit d\'une personne qui peut très bien être la Société personnifiée. Mais est-ce si fou de dire que l\'art est non seulement utile, mais aussi essentiel ?', 

                'Le besoin de création de Zekharia est-il la preuve qu\'il est malade, ou est-il des rares personnes qui fonctionnent correctement ? Quelle que soit la réponse, deux chemins s\'offrent à lui : se tordre pour s\'intégrer ou trouver le moyen de changer les mentalités.'
            ];

        case 2:
            return [
                'Zekharia Bettelheim is an unpretentious citizen of the Society of Arks, a spaceship on a quest for a new planet. Suffering, he tries to find an explanation to his affliction and is helped for this by the character he created. His imaginary friend helps with putting his thoughts in order, but he knows that someday he will need to call on a real person.', 

                'A chain of circumstances leads him to contact a former classmate who, contrary to Zekharia, seems to blossom in their little world and have everything going for him. This man can become the friend he needs, but first his being trustworthy has yet to be confirmed.', 

                'There is a real difference between a creation we know about and a human being, who always keeps their share of mystery and is therefore able of betrayal. In a world elevating the useful in dogma, it is difficult to admit to anyone that art makes us going through the day, even more so to a person who could as well be the Society personified. But is it this crazy to say that art is not only useful, but also essential?', 

                'Is Zekharia\'s urge to create the proof of his sickness, or is he one of the few who function properly? No matter the answer, two roads lie before him: twisting himself to fit in or finding the way to change mentalities.' 
            ];

        default:
            return [
                'Zekharia Bettelheim is an unpretentious citizen of the Society of Arks, a spaceship on a quest for a new planet. Suffering, he tries to find an explanation to his affliction and is helped for this by the character he created. His imaginary friend helps with putting his thoughts in order, but he knows that someday he will need to call on a real person.', 

                'A chain of circumstances leads him to contact a former classmate who, contrary to Zekharia, seems to blossom in their little world and have everything going for him. This man can become the friend he needs, but first his being trustworthy has yet to be confirmed.', 

                'There is a real difference between a creation we know about and a human being, who always keeps their share of mystery and is therefore able of betrayal. In a world elevating the useful in dogma, it is difficult to admit to anyone that art makes us going through the day, even more so to a person who could as well be the Society personified. But is it this crazy to say that art is not only useful, but also essential?', 

                'Is Zekharia\'s urge to create the proof of his sickness, or is he one of the few who function properly? No matter the answer, two roads lie before him: twisting himself to fit in or finding the way to change mentalities.' 
            ];
    }
};

export const radiata_lycoris = (lang) => 
{
    switch (lang)
    {
        case 2:
            return 'ブセティラ・リンダ';
        default:
            return 'Lycoris Radiata';
    }
};

export const standalone_novel = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Roman standalone';
        case 2:
            return 'スタンドアロン小説';
        default:
            return 'Standalone novel';
    }
};

export const science_fiction = (lang) => 
{
    switch (lang)
    {
        case 2:
            return '空想科学小説'; // 'Science fiction novel' and not SF in general
        default:
            return 'Science fiction';
    }
};

export const work_in_progress = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Projet en cours';
        case 2:
            return '仕掛品';
        default:
            return 'Work In Progress';
    }
};

export const info_title = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Titre : ';
        case 2:
            return 'Title: ';
        default:
            return 'Title: ';
    }
};

export const info_author = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Auteur : ';
        case 2:
            return '作家：';
        default:
            return 'Author: ';
    }
};

export const info_type = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Type : ';
        case 2:
            return 'Type: ';
        default:
            return 'Type: ';
    }
};

export const info_genre = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Genre : ';
        case 2:
            return 'Genre: ';
        default:
            return 'Genre: ';
    }
};

export const info_release_date = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Date de sortie : ';
        case 2:
            return 'Release date: ';
        default:
            return 'Release date: ';
    }
};

export const info_summary = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Résumé : ';
        case 2:
            return 'Summary: ';
        default:
            return 'Summary: ';
    }
};

export const reviews = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Critiques';
        case 2:
            return 'Reviews';
        default:
            return 'Reviews';
    }
};

export const disclaimer_reviews_1_on_2 = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Les pages Booknode et Goodreads pour ';
        case 2:
            return 'The Booknode and Goodreads pages for ';
        default:
            return 'The Booknode and Goodreads pages for ';
    }
};

export const disclaimer_reviews_2_on_2 = (lang) => 
{
    switch (lang)
    {
        case 1:
            return ' seront disponibles à la sortie.';
        case 2:
            return ' will be available at release.';
        default:
            return ' will be available at release.';
    }
};

export const different_formats = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Les différents formats';
        case 2:
            return 'The different formats';
        default:
            return 'The different formats';
    }
};

export const all = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Tout';
        case 2:
            return '全て';
        default:
            return 'All';
    }
};

export const how_to_pick_format = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Comment choisir un format';
        case 2:
            return 'The how-to of picking a format';
        default:
            return 'The how-to of picking a format';
    }
};

/* HOME ----------------------------------------------------------------------------------------- */

export const title_about_website = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'C\'est quoi ce site ?';
        case 2:
            return 'このウェブサイトは何でしょうか';
        default:
            return 'What is this website?';
    }
};

export const msg_about_website = (lang) => 
{
    switch (lang)
    {
        case 1:
            return '<p>"Sand Compass" est le nom d\'une future société française. Sand Compass a pour ambition d\'aller chatouiller les frontières du monde connu, mais va pour l\'instant se contenter de son domaine favori : la fiction ! Ce site présente donc les œuvres fictives de Lycoris Radiata, CEO autoproclamée (parce que ça fait toujours <span class="txt_italic">plus mieux</span> en Anglais), et... Petite madame dont les compétences en code peuvent encore s\'améliorer.</p>\n\n<p>Si ce n\'est pas votre première visite, bon retour ! Je vous remercie de votre patience et de votre fidélité, elles seront récompensées.<p><p></p>';
        case 2:
            return '<p>"Sand Compass" is the name of a future French company. Sand Compass has for ambition to go tickle the known world\'s frontiers, but will for now settle for its favorite domain: storytelling! This website therefore presents the fictitious works of Lycoris Radiata, self-proclaimed CEO, and... Lil\' lady whose coding skills surely need some refining.</p>\n\n<p>If this is not your first visit, welcome back! I thank you for your patience and loyalty, they will be rewarded.</p><p></p>';
        default:
            return '<p>"Sand Compass" is the name of a future French company. Sand Compass has for ambition to go tickle the known world\'s frontiers, but will for now settle for its favorite domain: storytelling! This website therefore presents the fictitious works of Lycoris Radiata, self-proclaimed CEO, and... Lil\' lady whose coding skills surely need some refining.</p>\n\n<p>If this is not your first visit, welcome back! I thank you for your patience and loyalty, they will be rewarded.</p><p></p>';
    }
};

export const home_cosmic_dust = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Une Poussière du cosmos : Roman standalone de SF';
        case 2:
            return '「宇宙塵」: スタンドアロン空想科学小説';
        default:
            return 'Cosmic Dust: Standalone sci-fi novel';
    }
};

export const title_last_article = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Dernier article';
        case 2:
            return 'Last article';
        default:
            return 'Last article';
    }
};

export const read_more = (lang) => 
{
    switch (lang)
    {
        case 1:
            return '[Lire plus]';
        case 2:
            return '[Read more]';
        default:
            return '[Read more]';
    }
};

/* LICENSES ------------------------------------------------------------------------------------- */

export const license_contact = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Utilisez le formulaire de contact pour des détails';
        case 2:
            return 'Use the contact form to ask for details';
        default:
            return 'Use the contact form to ask for details';
    }
};

export const free = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Gratuits';
        case 2:
            return '無料';
        default:
            return 'Free';
    }
};

export const bought = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Achetés';
        case 2:
            return '買った';
        default:
            return 'Bought';
    }
};

export const font = (lang, font, type) => 
{
    switch (lang)
    {
        case 1:
            return `Police ${font} (${type})`
        case 2:
            return `${font} font (${type})`;
        default:
            return `${font} font (${type})`;
    }
};

export const favicon = (lang) => 
{
    switch (lang)
    {
        case 2:
            return 'ファビコン';
        default:
            return 'Favicon';
    }
};

export const banner = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Bannière';
        case 2:
            return 'バナー';
        default:
            return 'Banner';
    }
};

export const round_country_flags = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Drapeaux de pays arrondis';
        case 2:
            return 'Round country flags';
        default:
            return 'Round country flags';
    }
};

export const book_cover_cosmic_dust = (lang) => 
{
    switch (lang)
    {
        case 1:
            return `Première de couverture de "${title_cosmic_dust(lang)}"`;
        case 2:
            return `「${title_cosmic_dust(lang)}」の書皮`;
        default:
            return `Book cover of "${title_cosmic_dust(lang)}"`;
    }
};

/* CONTACT -------------------------------------------------------------------------------------- */

export const something_to_say = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Une chose à dire ?';
        case 2:
            return '何か言いたいんですか。';
        default:
            return 'Something to say?';
    }
};

export const personal = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Particulier';
        case 2:
            return '個人';
        default:
            return 'Personal';
    }
};

export const professional = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Professionnel';
        case 2:
            return 'プロフェッショナル';
        default:
            return 'Professional';
    }
};

export const optional_business_name = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Raison sociale (optionnel)';
        case 2:
            return '会社名（随意的）';
        default:
            return 'Business name (optional)';
    }
};

export const name = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Nom';
        case 2:
            return '名前';
        default:
            return 'Name';
    }
};

export const email_address = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Adresse email';
        case 2:
            return 'メールアドレス';
        default:
            return 'Email address';
    }
};

export const select_subject = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Sélectionnez un sujet';
        case 2:
            return '話題を選んで';
        default:
            return 'Select a subject';
    }
};

export const opt_projects = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Projets';
        case 2:
            return 'プロジェクト';
        default:
            return 'Projects';
    }
};

export const opt_cosmic_dust = (lang) => 
{
    switch (lang)
    {
        case 1:
            return `Livre : ${title_cosmic_dust(lang)}`;
        case 2:
            return `本：${title_cosmic_dust(lang)}`;
        default:
            return `Book: ${title_cosmic_dust(lang)}`;
    }
};

export const title_persistence = (lang) => 
{
    switch (lang)
    {
        case 2:
            return 'ペルシステンス';
        default:
            return 'Persistence';
    }
};

export const opt_persistence = (lang) => 
{
    switch (lang)
    {
        case 1:
            return `Jeu : ${title_persistence(lang)}`;
        case 2:
            return `ゲーム：${title_persistence(lang)}`;
        default:
            return `Game: ${title_persistence(lang)}`;
    }
};

export const opt_another_project = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Un autre projet';
        case 2:
            return '他のプロジェクト';
        default:
            return 'Another project';
    }
};

export const opt_misc = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Divers';
        case 2:
            return '雑多';
        default:
            return 'Miscellaneous';
    }
};

export const opt_this_website = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Ce site web';
        case 2:
            return 'このウェブサイト';
        default:
            return 'This website';
    }
};

export const opt_legal_stuff = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Chose légale';
        case 2:
            return '法的な者';
        default:
            return 'Legal stuff';
    }
};

export const opt_other = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Autre';
        case 2:
            return '他の事';
        default:
            return 'Other';
    }
};

export const write_message_with_markdown = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Écrire le message avec Markdown ';
        case 2:
            return 'マークダウンでメッセージを書く';
        default:
            return 'Write the message with Markdown ';
    }
};

export const markdown_cheat_sheet_link = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'https://blog.shevarezo.fr/post/2015/02/18/syntaxe-markdown';
        case 2:
            return 'https://notepm.jp/help/how-to-markdown';
        default:
            return 'https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet';
    }
};

export const message = (lang) => 
{
    switch (lang)
    {
        case 2:
            return 'メッセージ';
        default:
            return 'Message';
    }
};

export const send = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Envoyer';
        case 2:
            return '送る';
        default:
            return 'Send';
    }
};

/* BLOG ----------------------------------------------------------------------------------------- */

export const blog_is_empty = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Le blog est vide.';
        case 2:
            return 'ブログは空っぽです。';
        default:
            return 'The blog is empty.';
    }
};

export const sort_from_oldest = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Ordonne du plus ancien au plus récent';
        case 2:
            return 'Sort from oldest to most recent';
        default:
            return 'Sort from oldest to most recent';
    }
};

export const sort_from_most_recent = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Ordonne du plus récent au plus ancien';
        case 2:
            return 'Sort from most recent to oldest';
        default:
            return 'Sort from most recent to oldest';
    }
};

export const all_categories = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Toutes catégories';
        case 2:
            return '全ての範疇';
        default:
            return 'All categories';
    }
};

export const category_is_empty = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Cette catégorie est vide.';
        case 2:
            return 'この範疇は空っぽです。';
        default:
            return 'This category is empty.';
    }
};

export const go_first_page = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Première page';
        case 2:
            return 'First page';
        default:
            return 'First page';
    }
};

export const go_last_page = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Dernière page';
        case 2:
            return 'Last page';
        default:
            return 'Last page';
    }
};

export const go_previous_page = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Page précédente';
        case 2:
            return 'Previous page';
        default:
            return 'Previous page';
    }
};

export const go_next_page = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Page suivante';
        case 2:
            return 'Next page';
        default:
            return 'Next page';
    }
};

export const go_precise_page = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Page précise';
        case 2:
            return 'Precise page';
        default:
            return 'Precise page';
    }
};

export const info_categories = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Catégories : ';
        case 2:
            return '範疇：';
        default:
            return 'Categories: ';
    }
};

export const info_created = (lang, date, time) => 
{
    switch (lang)
    {
        case 1:
            return `Créé le ${date} à ${time}.`;
        case 2:
            return `${date}${time}時に書かれました。`;
        default:
            return `Created on the ${date} at ${time}.`;
    }
};

export const info_modified = (lang, date, time) => 
{
    switch (lang)
    {
        case 1:
            return `Modifié le ${date} à ${time}.`;
        case 2:
            return `${date}${time}時に修正されました。`;
        default:
            return `Modified on the ${date} at ${time}.`;
    }
};

export const title_not_found = (lang) => 
{
    switch (lang)
    {
        case 1:
            return '[Titre non trouvé]';
        case 2:
            return '[タイトルが見つかりません]';
        default:
            return '[Title not found]';
    }
};

export const category_not_found = (lang) => 
{
    switch (lang)
    {
        case 1:
            return '[Catégorie non trouvée]';
        case 2:
            return '[範疇が見つかりません]';
        default:
            return '[Category not found]';
    }
};

export const user_not_found = (lang) => 
{
    switch (lang)
    {
        case 1:
            return '[Utilisateur non trouvé]';
        case 2:
            return '[ユーザーが見つかりません]';
        default:
            return '[User not found]';
    }
};

export const content_not_found = (lang) => 
{
    switch (lang)
    {
        case 1:
            return '[Contenu non trouvé]';
        case 2:
            return '[コンテンツが見つかりません]';
        default:
            return '[Content not found]';
    }
};

export const other_articles = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Autres articles';
        case 2:
            return '他の記事';
        default:
            return 'Other articles';
    }
};

export const like = (lang) => 
{
    switch (lang)
    {
        case 2:
            return 'ライク';
        default:
            return 'Like';
    }
};

export const dislike = (lang) => 
{
    switch (lang)
    {
        case 2:
            return 'ディスライク';
        default:
            return 'Dislike';
    }
};

export const vote_instruction = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Connecte-toi pour liker ou disliker';
        case 2:
            return 'ライクとディスライクをする為、ログインして下さい';
        default:
            return 'Log in to like or dislike';
    }
};

export const wip = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Cette fonctionnalité est en travaux';
        case 2:
            return 'This feature is a work in progress';
        default:
            return 'This feature is a work in progress';
    }
};

export const error_article_doesnt_exist = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Il semble que cet article n\'existe plus.';
        case 2:
            return 'Error: It seems like the article doesn\'t exist anymore.';
        default:
            return 'Error: It seems like the article doesn\'t exist anymore.';
    }
};

export const like_own_article = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Vous likeriez vraiment votre propre article ?';
        case 2:
            return 'You would really upvote your own article?';
        default:
            return 'You would really upvote your own article?';
    }
};

export const dislike_own_article = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Ne soyez pas trop dur avec vous-même.';
        case 2:
            return 'Don\'t be too hard on yourself.';
        default:
            return 'Don\'t be too hard on yourself.';
    }
};

/* ACCOUNT -------------------------------------------------------------------------------------- */

export const user_account = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Compte utilisateur';
        case 2:
            return 'ユーザーアカウント';
        default:
            return 'User Account';
    }
};

export const password = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Mot de passe';
        case 2:
            return 'パスワード';
        default:
            return 'Password';
    }
};

export const stay_logged_in_for_30_days = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Rester connecté(e) 30 jours';
        case 2:
            return 'Stay logged in for 30 days';
        default:
            return 'Stay logged in for 30 days';
    }
};

export const password_forgotten = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Mot de passe oublié ?';
        case 2:
            return 'パスワードを忘れちゃいましたか。';
        default:
            return 'Password forgotten?';
    }
};

export const not_yet_registered = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Pas encore inscrit(e) ?';
        case 2:
            return 'まだユーザーじゃないんですか。';
        default:
            return 'Not yet registered?';
    }
};

export const disclaimer_email_and_password = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'L\'adresse email et le mot de passe sont tous deux nécessaires.';
        case 2:
            return 'The email address and the password are both required.';
        default:
            return 'The email address and the password are both required.';
    }
};

export const password_creation = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Création de mot de passe';
        case 2:
            return 'パスワード作り';
        default:
            return 'Password Creation';
    }
};

export const create_password = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Créer le mot de passe';
        case 2:
            return 'パスワードを作る';
        default:
            return 'Create password';
    }
};

export const go_back_log_in = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Retourner à la page de connexion';
        case 2:
            return 'ログインページに戻る';
        default:
            return 'Go back to the Log In page';
    }
};

export const token_title_email = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Lien pour vérifier l\'adresse email';
        case 2:
            return 'Link to verify the email address';
        default:
            return 'Link to verify the email address';
    }
};

export const token_instruction_email = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Essayez de vous connecter. Si votre adresse email n\'est pas encore vérifiée, une pop-up demande si vous désirez recevoir un nouveau lien.';
        case 2:
            return 'Try to log in. If your email address is not yet verified, a pop-up asks whether you wish to receive a new link.';
        default:
            return 'Try to log in. If your email address is not yet verified, a pop-up asks whether you wish to receive a new link.';
    }
};

export const token_title_password = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Lien pour modifier le mot de passe';
        case 2:
            return 'Link to modify the password';
        default:
            return 'Link to modify the password';
    }
};

export const token_instruction_password = (lang) => 
{
    switch (lang)
    {
        case 1:
            return `Cliquez sur "${password_forgotten(lang)}".`;
        case 2:
            return `「${password_forgotten(lang)}」をクリックして下さい。`;
        default:
            return `Click on "${password_forgotten(lang)}".`;
    }
};

export const oops = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Oups...';
        case 2:
            return 'Oops...';
        default:
            return 'Oops...';
    }
};

export const success = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Succès';
        case 2:
            return 'Success';
        default:
            return 'Success';
    }
};

export const error_occured = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Une erreur est survenue.';
        case 2:
            return 'A problem occured.';
        default:
            return 'A problem occured.';
    }
};

/* CONTROL PANEL -------------------------------------------------------------------------------- */

export const statistics = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Statistiques';
        case 2:
            return 'Statistics';
        default:
            return 'Statistics';
    }
};

export const faq_editor = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Éditeur de FAQ';
        case 2:
            return 'FAQ Editor';
        default:
            return 'FAQ Editor';
    }
};

export const blog_editor = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Éditeur de blog';
        case 2:
            return 'Blog Editor';
        default:
            return 'Blog Editor';
    }
};

export const newsletter_editor = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Éditeur de newsletter';
        case 2:
            return 'Newsletter Editor';
        default:
            return 'Newsletter Editor';
    }
};

export const refresh_stats = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Actualiser les stats';
        case 2:
            return 'Refresh stats';
        default:
            return 'Refresh stats';
    }
};

export const click_for_stats = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Cliquez pour obtenir les stats';
        case 2:
            return 'Click to get the stats';
        default:
            return 'Click to get the stats';
    }
};

export const admin_not_counted = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Notez que l\'administrateur n\'est pas compté';
        case 2:
            return 'Note that the administrator is not counted';
        default:
            return 'Note that the administrator is not counted';
    }
};

export const info_verified_users = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Utilisateurs vérifiés : ';
        case 2:
            return 'Verified users: ';
        default:
            return 'Verified users: ';
    }
};

export const info_newsletter_subscribers = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Abonnés à la newsletter : ';
        case 2:
            return 'Newsletter subscribers: ';
        default:
            return 'Newsletter subscribers: ';
    }
};

export const info_english_users = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Utilisateurs préférant l\'Anglais : ';
        case 2:
            return 'English preferring users: ';
        default:
            return 'English preferring users: ';
    }
};

export const info_french_users = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Utilisateurs préférant le Français : ';
        case 2:
            return 'French preferring users: ';
        default:
            return 'French preferring users: ';
    }
};

export const info_japanese_users = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Utilisateurs préférant le Japonais : ';
        case 2:
            return 'Japanese preferring users: ';
        default:
            return 'Japanese preferring users: ';
    }
};

export const simple_stat = (lang, number) => 
{
    switch (lang)
    {
        case 2:
            return number + '。';
        default:
            return number + '.';
    }
};

export const slash_stat = (lang, number, total) => 
{
    switch (lang)
    {
        case 2:
            return number + '/' + total + '。';
        default:
            return number + '/' + total + '.';
    }
};

export const percentage_on_all_users = (lang, number) => 
{
    switch (lang)
    {
        case 1:
            return number + '% de tous les utilisateurs';
        case 2:
            return number + '% of all users';
        default:
            return number + '% of all users';
    }
};

export const percentage_on_verified_users = (lang, number) => 
{
    switch (lang)
    {
        case 1:
            return number + '% des utilisateurs vérifiés';
        case 2:
            return number + '% of verified users';
        default:
            return number + '% of verified users';
    }
};

export const refresh_newsletters = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Actualiser les newsletters';
        case 2:
            return 'Refresh newsletters';
        default:
            return 'Refresh newsletters';
    }
};

export const select_newsletter = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Sélectionnez une newsletter';
        case 2:
            return 'Select a newsletter';
        default:
            return 'Select a newsletter';
    }
};

export const write_new_newsletter = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Écrire une nouvelle newsletter';
        case 2:
            return '新しいニュースレターを書く';
        default:
            return 'Write a new newsletter';
    }
};

export const sent = (lang) => 
{
    switch (lang)
    {
        case 1:
            return '[Envoyée]';
        case 2:
            return '[Sent]';
        default:
            return '[Sent]';
    }
};

export const not_sent = (lang) => 
{
    switch (lang)
    {
        case 1:
            return '[Non envoyée]';
        case 2:
            return '[Not sent]';
        default:
            return '[Not sent]';
    }
};

export const object = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Objet';
        case 2:
            return '話題';
        default:
            return 'Object';
    }
};

export const select_language = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Sélectionnez une langue';
        case 2:
            return 'Select a language';
        default:
            return 'Select a language';
    }
};

export const send_newsletter = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Envoyer la newsletter aux abonnés';
        case 2:
            return 'Send the newsletter to subscribers';
        default:
            return 'Send the newsletter to subscribers';
    }
};

export const info_language = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Langue : ';
        case 2:
            return '言語：';
        default:
            return 'Language: ';
    }
};

export const info_object = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Objet : ';
        case 2:
            return '話題：';
        default:
            return 'Object: ';
    }
};

export const info_date = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Date : ';
        case 2:
            return '発行日：';
        default:
            return 'Date: ';
    }
};

export const info_message = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Message : ';
        case 2:
            return 'メッセージ：';
        default:
            return 'Message: ';
    }
};

export const disclaimer_obj_and_msg = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'The object and the message have to be filled.';
        case 2:
            return 'The object and the message have to be filled.';
        default:
            return 'The object and the message have to be filled.';
    }
};

export const disclaimer_language = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'The language has to be selected.';
        case 2:
            return 'The language has to be selected.';
        default:
            return 'The language has to be selected.';
    }
};

/* BLOG EDITOR ---------------------------------------------------------------------------------- */

export const post_new_article = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Poster un nouvel article';
        case 2:
            return 'Post a new article';
        default:
            return 'Post a new article';
    }
};

export const select_article = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Sélectionnez un article';
        case 2:
            return 'Select an article';
        default:
            return 'Select an article';
    }
};

export const no_article = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Aucun article';
        case 2:
            return 'No article';
        default:
            return 'No article';
    }
};

export const modify_article = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Modifier un article';
        case 2:
            return 'Modify an article';
        default:
            return 'Modify an article';
    }
};

export const delete_article = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Supprimer un article';
        case 2:
            return '記事を消す';
        default:
            return 'Delete an article';
    }
};

export const title = (lang, index) => 
{
    switch (lang)
    {
        case 1:
            return `Titre (${dynamic_language(lang, index)})`;
        case 2:
            return `タイトル（${dynamic_language(lang, index)}）`;
        default:
            return `Title (${dynamic_language(lang, index)})`;
    }
};

export const no_category = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Aucune catégorie';
        case 2:
            return 'No category';
        default:
            return 'No category';
    }
};

export const select_category = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Sélectionnez une catégorie';
        case 2:
            return 'Select a category';
        default:
            return 'Select a category';
    }
};

export const manage_categories = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Gérer les catégories';
        case 2:
            return 'Manage categories';
        default:
            return 'Manage categories';
    }
};

export const new_category = (lang, index) => 
{
    switch (lang)
    {
        case 1:
            return `Nouvelle catégorie (${dynamic_language(lang, index)})`;
        case 2:
            return `New category（${dynamic_language(lang, index)}）`;
        default:
            return `New category (${dynamic_language(lang, index)})`;
    }
};

export const add_category = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Ajouter une catégorie';
        case 2:
            return 'Add a category';
        default:
            return 'Add a category';
    }
};

export const delete_category = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Supprimer une catégorie';
        case 2:
            return 'Delete a category';
        default:
            return 'Delete a category';
    }
};

export const modify_category = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Modifier une catégorie';
        case 2:
            return 'Modify a category';
        default:
            return 'Modify a category';
    }
};

export const edit_category = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Éditer la catégorie';
        case 2:
            return 'Edit the category';
        default:
            return 'Edit the category';
    }
};

export const content = (lang, index) => 
{
    switch (lang)
    {
        case 1:
            return `Contenu (${dynamic_language(lang, index)})`;
        case 2:
            return `コンテンツ（${dynamic_language(lang, index)}）`;
        default:
            return `Content (${dynamic_language(lang, index)})`;
    }
};

export const preview = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Aperçu';
        case 2:
            return 'プレビュー';
        default:
            return 'Preview';
    }
};

export const disclaimer_blog_editor_title = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'L\'article a besoin d\'un titre.';
        case 2:
            return 'The article needs a title.';
        default:
            return 'The article needs a title.';
    }
};

export const disclaimer_blog_editor_category = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'L\'article a besoin d\'une catégorie.';
        case 2:
            return 'The article needs a category.';
        default:
            return 'The article needs a category.';
    }
};

export const disclaimer_blog_editor_content = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'L\'article a besoin de contenu.';
        case 2:
            return 'The article needs content.';
        default:
            return 'The article needs content.';
    }
};

/* PORTFOLIO ------------------------------------------------------------------------------------ */

export const vrmmorpg_project = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Projet de VRMMORPG';
        case 2:
            return 'VRMMORPGのプロジェクト';
        default:
            return 'VRMMORPG project';
    }
};

export const game = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Jeu';
        case 2:
            return 'ゲーム';
        default:
            return 'Game';
    }
};

export const disclaimer_os = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Le jeu n\'est disponible que sur PC.';
        case 2:
            return 'The game is only available on PC.';
        default:
            return 'The game is only available on PC.';
    }
};

export const code = (lang) => 
{
    switch (lang)
    {
        case 2:
            return 'コード';
        default:
            return 'Code';
    }
};

