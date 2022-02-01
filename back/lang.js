/* LANGUAGES ------------------------------------------------------------------------------------ */

const short_lang = (index) => 
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

const long_lang = (index) => 
{
    switch (index)
    {
        case 1:
            return 'French';
        case 2:
            return 'Japanese';
        default:
            return 'English';
    }
};

/* DEFAULT ERROR MESSAGE ------------------------------------------------------------------------ */

const failure = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Une erreur est survenue.';
        case 2:
            return 'Error: An error occured.';
        default:
            return 'Error: An error occured.';
    }
};

const failure_see_log = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Une erreur est survenue. Voir le log.';
        case 2:
            return 'Error: An error occured. See the log.';
        default:
            return 'Error: An error occured. See the log.';
    }
};

/* MAILING -------------------------------------------------------------------------------------- */

const failure_try_again = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Re-essayez.';
        case 2:
            return 'Error: Try again.';
        default:
            return 'Error: Try again.';
    }
};

const success_message_sent = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Message envoyé.';
        case 2:
            return 'Message sent.';
        default:
            return 'Mesage sent.';
    }
};

const welcome_to_sandcompass = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Bienvenue chez Sand Compass';
        case 2:
            return 'サンドコンパスへようこそ';
        default:
            return 'Welcome to Sand Compass';
    }
};

const welcome_to_sandcompass_user = (lang, username) => 
{
    switch (lang)
    {
        case 1:
            return `Bienvenue chez Sand Compass, ${username} !`;
        case 2:
            return `サンドコンパスへようこそ、${username}さん！`;
        default:
            return `Welcome to Sand Compass, ${username}!`;
    }
};

const click_email_verification_link = (lang, link) => 
{
    switch (lang)
    {
        case 1:
            return `Pour être certaine que vous êtes derrière cette inscription, vous êtes invité(e) à <a href="${link}">cliquer ici</a> pour valider votre adresse email.`;
        case 2:
            return `To be assured you're behind this registration, you're invited to <a href="${link}">click here</a> to verify your email address.`;
        default:
            return `To be assured you're behind this registration, you're invited to <a href="${link}">click here</a> to verify your email address.`;
    }
};

const user_is_subscribed_to_newsletter = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Vous êtes abonné(e) à la newsletter, ce qui vous permet d\'être mis(e) au courant de l\'avancée des projets.';
        case 2:
            return 'You\'re subscribed to the newsletter, which allows you to be updated on the projects\' progress.';
        default:
            return 'You\'re subscribed to the newsletter, which allows you to be updated on the projects\' progress.';
    }
};

const suggest_subscription_to_newsletter = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Si vous désirez être tenu(e) au courant de l\'avancée des projets, abonnez-vous à la newsletter depuis votre compte Sand Compass.';
        case 2:
            return 'If you desire to be updated on the projects\' progress, subscribe to the newsletter from your Sand Compass account.';
        default:
            return 'If you desire to be updated on the projects\' progress, subscribe to the newsletter from your Sand Compass account.';
    }
};

const help_by_speaking_about_sc = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Merci de l\'attention que vous exprimez envers Sand Compass ! Si vous souhaitez aider des projets à voir le jour, parlez de Sand Compass autour de vous et sur les réseaux sociaux.';
        case 2:
            return 'Thank you for the attention you express towards Sand Compass! If you wish to help projects get along, speak about Sand Compass around you and on social media.';
        default:
            return 'Thank you for the attention you express towards Sand Compass! If you wish to help projects get along, speak about Sand Compass around you and on social media.';
    }
};

const help_by_leaving_message = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Vous pouvez aussi laisser un message sur le site avec une remarque, une question ou une suggestion.';
        case 2:
            return 'You can also help by leaving a message on the website with a remark, question or suggestion.';
        default:
            return 'You can also help by leaving a message on the website with a remark, question or suggestion.';
    }
};

const failure_no_account_matches_this_email = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Cette adresse email ne correspond à aucun compte.';
        case 2:
            return 'Error: No account matches this email address.';
        default:
            return 'Error: No account matches this email address.';
    }
};

const failure_account_validation_email = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Le mail de validation de compte n\'a pas pu être envoyé.';
        case 2:
            return 'Error: The account validation email couldn\'t be sent.';
        default:
            return 'Error: The account validation email couldn\'t be sent.';
    }
};

const success_account_validation_email = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Vous venez de recevoir un mail ! Il contient un lien cliquable pour valider votre adresse email.';
        case 2:
            return 'You\'ve just been sent an email! It contains a clickable link to verify your email address.';
        default:
            return 'You\'ve just been sent an email! It contains a clickable link to verify your email address.';
    }
};

const title_newsletter_subscription_email = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Vous êtes maintenant abonné(e) à la newsletter';
        case 2:
            return 'You\'re now subscribed to the newsletter';
        default:
            return 'You\'re now subscribed to the newsletter';
    }
};

const hello_user = (lang, username) => 
{
    switch (lang)
    {
        case 1:
            return `Bonjour, ${username} !`;
        case 2:
            return `こんにちは、${username}さん！`;
        default:
            return `Hello, ${username}!`;
    }
};

const failure_newsletter_subscription_email = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Le mail de newsletter n\'a pas pu être envoyé.';
        case 2:
            return 'Error: The newsletter email couldn\'t be sent.';
        default:
            return 'Error: The newsletter email couldn\'t be sent.';
    }
};

const success_newsletter_subscription_email = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Vous venez de recevoir un mail.';
        case 2:
            return 'You\'ve just been sent an email.';
        default:
            return 'You\'ve just been sent an email.';
    }
};

const title_email_address_update_email = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Validez votre adresse email';
        case 2:
            return 'Verify your email address';
        default:
            return 'Verify your email address';
    }
};

const click_new_email_verification_link = (lang, email, link) => 
{
    switch (lang)
    {
        case 1:
            return `Vous venez de communiquer "${email}" comme votre nouvelle adresse email. <a href="${link}">Cliquez ici</a> pour la valider.`;
        case 2:
            return `You've just communicated "${email}" as your new email address. <a href="${link}">Click here</a> to verify it.`;
        default:
            return `You've just communicated "${email}" as your new email address. <a href="${link}">Click here</a> to verify it.`;
    }
};

const failure_email_address_update_email = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Le mail de validation pour votre adresse email n\'a pas pu être envoyé.';
        case 2:
            return 'Error: The verification email for your email address couldn\'t be sent.';
        default:
            return 'Error: The verification email for your email address couldn\'t be sent.';
    }
};

const success_email_address_update_email = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Vous venez de recevoir un mail sur votre nouvelle adresse email ! Il contient un lien cliquable pour valider votre adresse email.';
        case 2:
            return 'You\'ve just been sent an email on your new email address! It contains a clickable link to verify your email address.';
        default:
            return 'You\'ve just been sent an email on your new email address! It contains a clickable link to verify your email address.';
    }
};

const title_password_email = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Création du mot de passe';
        case 2:
            return 'Password creation';
        default:
            return 'Password creation';
    }
};

const click_password_link = (lang, link) => 
{
    switch (lang)
    {
        case 1:
            return `<a href="${link}">Cliquez ici</a> pour créer votre mot de passe.`;
        case 2:
            return `<a href="${link}">Click here</a> to create your password.`;
        default:
            return `<a href="${link}">Click here</a> to create your password.`;
    }
};

const email_has_to_be_verified = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'L\'adresse email doit d\'abord être validée.';
        case 2:
            return 'The email address has to be verified first.';
        default:
            return 'The email address has to be verified first.';
    }
};

const success_password_email = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Vous venez de recevoir un mail ! Il contient un lien cliquable pour créer votre mot de passe.';
        case 2:
            return 'You\'ve just been sent an email! It contains a clickable link to set your password.';
        default:
            return 'You\'ve just been sent an email! It contains a clickable link to set your password.';
    }
};

const nbr_loaded_newsletters = (lang, number) => 
{
    switch (lang)
    {
        case 1:
            return number + ' newsletters chargées.';
        case 2:
            return number + ' newsletters loaded.';
        default:
            return number + ' newsletters loaded.';
    }
};

const success_newsletter_saved_and_not_sent = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'La newsletter est sauvegardée, mais pas encore envoyée.';
        case 2:
            return 'The newsletter is saved, but not sent yet.';
        default:
            return 'The newsletter is saved, but not sent yet.';
    }
};

const failure_newsletter_saved_but_no_lang_subscriber = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : La newsletter est sauvegardée, mais n\'a pas pu être envoyée car aucun compte qui utilise cette langue n\'est abonné à la newsletter.';
        case 2:
            return 'Error: The newsletter is saved, but couldn\'t be sent because no account using this language is subscribed to the newsletter.';
        default:
            return 'Error: The newsletter is saved, but couldn\'t be sent because no account using this language is subscribed to the newsletter.';
    }
};

const failure_newsletter_saved_but_not_sent = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : La newsletter est sauvegardée, mais n\'a pas pu être envoyée. Re-essayez.';
        case 2:
            return 'Error: The newsletter is saved, but couldn\'t be sent. Try again.';
        default:
            return 'Error: The newsletter is saved, but couldn\'t be sent. Try again.';
    }
};

const failure_newsletter_sent_but_none_found = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : La newsletter a été envoyée, mais étrangement aucune newsletter n\'a pu être trouvée dans la base de données.';
        case 2:
            return 'Error: The newsletter has been sent, but strangely no newsletter could be found in database.';
        default:
            return 'Error: The newsletter has been sent, but strangely no newsletter could be found in database.';
    }
};

const success_newsletter_sent = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'La newsletter a été envoyée.';
        case 2:
            return 'The newsletter has been sent.';
        default:
            return 'The newsletter has been sent.';
    }
};

const failure_newsletter_sent_but_not_declared_as_sent = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : La newsletter est envoyée, mais n\'a pas pu être déclarée comme "envoyée" dans la base de données.';
        case 2:
            return 'Error: The newsletter is sent, but couldn\'t be declared as "sent" in database.';
        default:
            return 'Error: The newsletter is sent, but couldn\'t be declared as "sent" in database.';
    }
};

/* USER ----------------------------------------------------------------------------------------- */

return 'Error: The admin cannot be found.';
return 'Error: The email address is not verified.';
return 'Error: The account has no password.';
return 'Your email address or your password is incorrect.';
return 'The email address is not verified.';
return 'This account doesn\'t have a password yet. You\'re invited to click on "Password forgotten?".';
return 'No account exists with this email address.';
return 'The email address has to be verified first.';
return 'The password must not be empty.';
return 'Error: The password creation didn\'t work.';
return 'The password has been created.';
return 'This email address is already used by another account.';
return 'This email address can be used.';
return 'This username is already used by another account.';
return 'This username can be used.';
return 'Error: The account couldn\'t be created.';
return 'The account has been created.';
return 'The account has been updated.';
return 'Error: The account update failed.';
return 'The account has been deleted.';
return 'No non-admin account found.';
return 'Statistics transmitted.';
return 'User retrieved.';
return 'Error: The user couldn\'t be retrieved.';

module.exports = 
{
    short_lang, 
    long_lang, 
    failure,
    failure_see_log,
    failure_try_again, 
    success_message_sent, 
    welcome_to_sandcompass,
    welcome_to_sandcompass_user,
    click_email_verification_link,
    user_is_subscribed_to_newsletter,
    suggest_subscription_to_newsletter,
    help_by_speaking_about_sc,
    help_by_leaving_message,
    failure_no_account_matches_this_email,
    failure_account_validation_email, 
    success_account_validation_email, 
    title_newsletter_subscription_email,
    hello_user,
    failure_newsletter_subscription_email,
    success_newsletter_subscription_email,
    title_email_address_update_email,
    click_new_email_verification_link,
    failure_email_address_update_email,
    success_email_address_update_email,
    title_password_email,
    click_password_link,
    email_has_to_be_verified,
    success_password_email,
    nbr_loaded_newsletters,
    success_newsletter_saved_and_not_sent,
    failure_newsletter_saved_but_no_lang_subscriber,
    failure_newsletter_saved_but_not_sent,
    failure_newsletter_sent_but_none_found,
    success_newsletter_sent,
    failure_newsletter_sent_but_not_declared_as_sent,
};

