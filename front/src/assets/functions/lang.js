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

export const faq_is_empty = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'La FAQ est vide.';
        case 2:
            return 'FAQは空っぽでございます。';
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
            return 'Les pseudos ne peuvent avoir que des chiffres et des lettres.';
        case 2:
            return 'Usernames can only have letters and numbers.';
        default:
            return 'Usernames can only have letters and numbers.';
    }
};

export const username_disclaimer_and_display = (lang, parsed_username) => 
{
    switch (lang)
    {
        case 1:
            return `Les pseudos ne peuvent avoir que des chiffres et des lettres. "${parsed_username}" vous convient-il ?`;
        case 2:
            return `Usernames can only have letters and numbers. Does "${parsed_username}" suit you?`;
        default:
            return `Usernames can only have letters and numbers. Does "${parsed_username}" suit you?`;
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

export const logo_patreon = (lang) => 
{
    switch (lang)
    {
        case 2:
            return '「パトレオン」ロゴ';
        default:
            return 'Logo Patreon';
    }
};

export const logo_youtube = (lang) => 
{
    switch (lang)
    {
        case 2:
            return '「ユーチューブ」ロゴ';
        default:
            return 'Logo YouTube';
    }
};

export const logo_github = (lang) => 
{
    switch (lang)
    {
        case 2:
            return '「ギットハブ」ロゴ';
        default:
            return 'Logo GitHub';
    }
};

export const logo_reddit = (lang) => 
{
    switch (lang)
    {
        case 2:
            return '「レディット」ロゴ';
        default:
            return 'Logo Reddit';
    }
};

export const my_patreon = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Ma page Patreon';
        case 2:
            return '自分の「パトレオン」ページ';
        default:
            return 'My Patreon page';
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

/* EBOOK FORMAT PICKER -------------------------------------------------------------------------- */

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

export const ebook_format_picker_error = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Le questionnaire a rencontré une erreur.\nReprenons à la question 1...';
        case 2:
            return 'An error occurred with the questionnaire.\nRestarting at question 1...';
        default:
            return 'An error occurred with the questionnaire.\nRestarting at question 1...';
    }
};

export const arr_ebook_format_picker_questions = (lang) => 
{
    switch (lang)
    {
        case 1:
            return [
                'Avez-vous une liseuse ?', 
                'Kindle ou autre ?', 
                'Avez-vous un ordinateur personnel ?', 
                'Préférez-vous lire dessus ou sur un smartphone/tablette ?', 
                'Êtes-vous actuellement sur votre ordinateur ?', 
                'Êtes-vous sur votre smartphone ou votre tablette ?'
            ];
        case 2:
            return [
                'Do you have an e-reader?', 
                'Kindle or other?', 
                'Do you have a computer of yours?', 
                'Do you prefer to read on it or on a smartphone/tablet?', 
                'Are you currently on your computer?', 
                'Are you on your smartphone or tablet?'
            ];
        default:
            return [
                'Do you have an e-reader?', 
                'Kindle or other?', 
                'Do you have a computer of yours?', 
                'Do you prefer to read on it or on a smartphone/tablet?', 
                'Are you currently on your computer?', 
                'Are you on your smartphone or tablet?'
            ];
    }
};

export const arr_ebook_format_picker_options = (lang) => 
{
    switch (lang)
    {
        case 1:
            return [
                'Oui.', 
                'Non.', 
                'Qu\'est-ce que c\'est ?', 
                'Kindle.', 
                'Autre.', 
                'Non, et je suis sur un ordinateur qui ne m\'appartient pas.', 
                'Non, mais je suis sur mon smartphone ou ma tablette.', 
                'Ordinateur.', 
                'Smartphone ou tablette.'
            ];
        case 2:
            return [
                'Yes.', 
                'No.', 
                'What is it?', 
                'Kindle.', 
                'Other.', 
                'No, and I am on a computer that doesn\'t belong to me.', 
                'No, but I am on my smartphone or my tablet.', 
                'Computer.', 
                'Smartphone or tablet.'
            ];
        default:
            return [
                'Yes.', 
                'No.', 
                'What is it?', 
                'Kindle.', 
                'Other.', 
                'No, and I am on a computer that doesn\'t belong to me.', 
                'No, but I am on my smartphone or my tablet.', 
                'Computer.', 
                'Smartphone or tablet.'
            ];
    }
};

export const arr_ebook_format_picker_answers = (lang) => 
{
    switch (lang)
    {
        case 1:
            return [
                'Téléchargez le fichier AZW, branchez la liseuse, et glissez-y le fichier. Vous êtez prêt pour la lecture !', 
                'Téléchargez le fichier ePub, branchez la liseuse, et glissez-y le fichier. Vous êtez prêt pour la lecture !', 
                'Revenez avec votre smartphone ou votre tablette, installez Adobe Acrobat, téléchargez le fichier PDF, et ouvrez-le. Vous êtes prêt pour la lecture !', 
                'Installez Adobe Acrobat, téléchargez le fichier PDF, et ouvrez-le. Vous êtes prêt pour la lecture !', 
                'Téléchargez le fichier ePub, et ouvrez-le. Vous êtes prêt pour la lecture !', 
                'Revenez avec votre ordinateur, téléchargez le fichier ePub, et ouvrez-le. Vous êtes prêt pour la lecture !', 
                'Revenez avec votre smartphone ou votre tablette, installez Adobe Acrobat, téléchargez le fichier PDF, et ouvrez-le. Vous êtes prêt pour la lecture !'
            ];
        case 2:
            return [
                'Download the AZW file, plug in the e-reader, and slide the file in there. You can now read anytime!', 
                'Download the ePub file, plug in the e-reader, and slide the file in there. You can now read anytime!', 
                'Come back with your smartphone or tablet, install Adobe Acrobat, download the PDF file, and open it. You can now read anytime!', 
                'Install Adobe Acrobat, download the PDF file, and open it. You can now read anytime!', 
                'Download the ePub file, and open it. You can now read anytime!', 
                'Come back with your computer, download the ePub file, and open it. You can now read anytime!', 
                'Come back with your smartphone or tablet, install Adobe Acrobat, download the PDF file, and open it. You can now read anytime!'
            ];
        default:
            return [
                'Download the AZW file, plug in the e-reader, and slide the file in there. You can now read anytime!', 
                'Download the ePub file, plug in the e-reader, and slide the file in there. You can now read anytime!', 
                'Come back with your smartphone or tablet, install Adobe Acrobat, download the PDF file, and open it. You can now read anytime!', 
                'Install Adobe Acrobat, download the PDF file, and open it. You can now read anytime!', 
                'Download the ePub file, and open it. You can now read anytime!', 
                'Come back with your computer, download the ePub file, and open it. You can now read anytime!', 
                'Come back with your smartphone or tablet, install Adobe Acrobat, download the PDF file, and open it. You can now read anytime!'
            ];
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
            return 'Author: ';
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

export const file_name_azw = (lang) => 
{
    switch (lang)
    {
        case 2:
            return 'AZWの試し';
        default:
            return 'Test AZW';
    }
};

export const file_name_epub = (lang) => 
{
    switch (lang)
    {
        case 2:
            return 'ePubの試し';
        default:
            return 'Test ePub';
    }
};

export const file_name_pdf = (lang) => 
{
    switch (lang)
    {
        case 2:
            return 'PDFの試し';
        default:
            return 'Test PDF';
    }
};

export const file_name_all = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Test Tout';
        case 2:
            return '全ての試し';
        default:
            return 'Test All';
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
            return 'C\'est quoi ce site ?'
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
            return '<p>"Sand Compass" est le nom d\'une future société française. Sand Compass a pour ambition d\'aller chatouiller les frontières du monde connu, mais va pour l\'instant se contenter de son domaine favori : la fiction ! Ce site présente donc les œuvres fictives de Lycoris Radiata, CEO autoproclamée (parce que ça fait toujours <span class="txt_italic">plus mieux</span> en Anglais), et... Petite madame dont les compétences en code peuvent encore s\'améliorer.</p>\n\n<p>Si ce n\'est pas votre première visite, bon retour ! Je vous remercie de votre patience et de votre fidélité, elles seront récompensées.<p>';
        case 2:
            return '<p>"Sand Compass" is the name of a future French company. Sand Compass has for ambition to go tickle the known world\'s frontiers, but will for now settle for its favorite domain: storytelling! This website therefore presents the fictitious works of Lycoris Radiata, self-proclaimed CEO, and... Lil\' lady whose coding skills surely need some refining.</p>\n\n<p>If this is not your first visit, welcome back! I thank you for your patience and loyalty, they will be rewarded.</p>';
        default:
            return '<p>"Sand Compass" is the name of a future French company. Sand Compass has for ambition to go tickle the known world\'s frontiers, but will for now settle for its favorite domain: storytelling! This website therefore presents the fictitious works of Lycoris Radiata, self-proclaimed CEO, and... Lil\' lady whose coding skills surely need some refining.</p>\n\n<p>If this is not your first visit, welcome back! I thank you for your patience and loyalty, they will be rewarded.</p>';
    }
};

export const home_cosmic_dust = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Une Poussière du cosmos : Roman standalone de SF'
        case 2:
            return '「宇宙塵」: スタンドアロン空想科学小説';
        default:
            return 'Cosmic Dust: Standalone sci-fi novel';
    }
};

export const last_article = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Dernier article'
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
            return '[Lire plus]'
        case 2:
            return '[Read more]';
        default:
            return '[Read more]';
    }
};

