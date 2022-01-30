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

const click_email_validation_link = (lang, link) => 
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

module.exports = 
{
    short_lang, 
    long_lang, 
    failure_try_again, 
    success_message_sent, 
    welcome_to_sandcompass,
    welcome_to_sandcompass_user,
    click_email_validation_link,
    user_is_subscribed_to_newsletter,
    suggest_subscription_to_newsletter,
    help_by_speaking_about_sc,
    help_by_leaving_message,
    failure_account_validation_email, 
    success_account_validation_email, 
    failure_newsletter_subscription_email,
};

