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

const welcome_to_mofumofu = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Bienvenue chez Mofumofu';
        case 2:
            return 'モフモフへようこそ';
        default:
            return 'Welcome to Mofumofu';
    }
};

const welcome_to_mofumofu_user = (lang, username) => 
{
    switch (lang)
    {
        case 1:
            return `Bienvenue chez Mofumofu, ${username} !`;
        case 2:
            return `モフモフへようこそ、${username}さん！`;
        default:
            return `Welcome to Mofumofu, ${username}!`;
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
            return 'Si vous désirez être tenu(e) au courant de l\'avancée des projets, abonnez-vous à la newsletter depuis votre compte Mofumofu.';
        case 2:
            return 'If you desire to be updated on the projects\' progress, subscribe to the newsletter from your Mofumofu account.';
        default:
            return 'If you desire to be updated on the projects\' progress, subscribe to the newsletter from your Mofumofu account.';
    }
};

const help_by_speaking_about_sc = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Merci de l\'attention que vous exprimez envers Mofumofu ! Si vous souhaitez aider des projets à voir le jour, parlez de Mofumofu autour de vous et sur les réseaux sociaux.';
        case 2:
            return 'Thank you for the attention you express towards Mofumofu! If you wish to help projects get along, speak about Mofumofu around you and on social media.';
        default:
            return 'Thank you for the attention you express towards Mofumofu! If you wish to help projects get along, speak about Mofumofu around you and on social media.';
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

const failure_account_already_verified = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Ce compte est déjà vérifié.';
        case 2:
            return 'Error: This account is already verified.';
        default:
            return 'Error: This account is already verified.';
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

const failure_account_not_subscribed_to_newsletter = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Ce compte n\'est en fait pas abonné à la newsletter.';
        case 2:
            return 'Error: This account is actually not subscribed to the newsletter.';
        default:
            return 'Error: This account is actually not subscribed to the newsletter.';
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

const failure_email_has_to_be_verified = (lang) => 
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

const failure_admin_not_found = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : L\'admin est introuvable.';
        case 2:
            return 'Error: The admin cannot be found.';
        default:
            return 'Error: The admin cannot be found.';
    }
};

const failure_admin_email_not_verified = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : L\'adresse email n\'est pas validée.';
        case 2:
            return 'Error: The email address is not verified.';
        default:
            return 'Error: The email address is not verified.';
    }
};

const failure_admin_no_password = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Le compte n\'a pas de mot de passe.';
        case 2:
            return 'Error: The account has no password.';
        default:
            return 'Error: The account has no password.';
    }
};

const failure_wrong_email_or_password = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Votre adresse email ou votre mot de passe est incorrect.';
        case 2:
            return 'Your email address or your password is incorrect.';
        default:
            return 'Your email address or your password is incorrect.';
    }
};

const failure_no_password = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Ce compte n\'a pas encore de mot de passe. Je vous invite à cliquer sur "Mot de passe oublié ?".';
        case 2:
            return 'This account doesn\'t have a password yet. You\'re invited to click on "Password forgotten?".';
        default:
            return 'This account doesn\'t have a password yet. You\'re invited to click on "Password forgotten?".';
    }
};

const failure_no_account_with_this_email = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Aucun compte avec cette adresse email n\'existe.';
        case 2:
            return 'No account exists with this email address.';
        default:
            return 'No account exists with this email address.';
    }
};

const failure_empty_password = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Le mot de passe ne doit pas être vide.';
        case 2:
            return 'The password must not be empty.';
        default:
            return 'The password must not be empty.';
    }
};

const failure_password_creation = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : La création du mot de passe a échoué.';
        case 2:
            return 'Error: The password creation failed.';
        default:
            return 'Error: The password creation failed.';
    }
};

const success_password_creation = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Le mot de passe a été créé.';
        case 2:
            return 'The password has been created.';
        default:
            return 'The password has been created.';
    }
};

const failure_email_already_in_use = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Cette adresse email est déjà utilisée par un autre compte.';
        case 2:
            return 'This email address is already used by another account.';
        default:
            return 'This email address is already used by another account.';
    }
};

const success_email_available = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Cette adresse email peut être utilisée.';
        case 2:
            return 'This email address can be used.';
        default:
            return 'This email address can be used.';
    }
};

const failure_username_already_in_use = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Ce pseudo est déjà utilisé par un autre compte.';
        case 2:
            return 'This username is already used by another account.';
        default:
            return 'This username is already used by another account.';
    }
};

const success_username_available = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Ce pseudo peut être utilisé.';
        case 2:
            return 'This username can be used.';
        default:
            return 'This username can be used.';
    }
};

const failure_account_creation = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Le compte n\'a pas pu être créé.';
        case 2:
            return 'Error: The account couldn\'t be created.';
        default:
            return 'Error: The account couldn\'t be created.';
    }
};

const success_account_creation = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Le compte a été créé.';
        case 2:
            return 'The account has been created.';
        default:
            return 'The account has been created.';
    }
};

const success_account_update = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Le compte a été mis à jour.';
        case 2:
            return 'The account has been updated.';
        default:
            return 'The account has been updated.';
    }
};

const failure_account_update = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : La mise à jour du compte a échoué.';
        case 2:
            return 'Error: The account update failed.';
        default:
            return 'Error: The account update failed.';
    }
};

const success_account_deletion = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Le compte a été supprimé.';
        case 2:
            return 'The account has been deleted.';
        default:
            return 'The account has been deleted.';
    }
};

const failure_no_non_admin_user_found = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Aucun compte non admin trouvé.';
        case 2:
            return 'No non-admin account found.';
        default:
            return 'No non-admin account found.';
    }
};

const success_stats = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Statistiques transmises.';
        case 2:
            return 'Statistics transmitted.';
        default:
            return 'Statistics transmitted.';
    }
};

const success_user_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Utilisateur retrouvé.';
        case 2:
            return 'User retrieved.';
        default:
            return 'User retrieved.';
    }
};

const failure_user_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : L\'utilisateur n\'a pas pu être retrouvé.';
        case 2:
            return 'Error: The user couldn\'t be retrieved.';
        default:
            return 'Error: The user couldn\'t be retrieved.';
    }
};

/* BLOG ----------------------------------------------------------------------------------------- */

const success_articles_retrieval = (lang, number) => 
{
    switch (lang)
    {
        case 1:
            return number + ' articles chargés.';
        case 2:
            return number + ' articles loaded.';
        default:
            return number + ' articles loaded.';
    }
};

const failure_articles_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Les articles ne peuvent pas être retrouvés.';
        case 2:
            return 'Error: The articles can\'t be retrieved.';
        default:
            return 'Error: The articles can\'t be retrieved.';
    }
};

const failure_article_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : L\'article n\'a pas pu être retrouvé.';
        case 2:
            return 'Error: Article couldn\'t be retrieved.';
        default:
            return 'Error: Article couldn\'t be retrieved.';
    }
};

const success_article_retrieval = (lang, id) => 
{
    switch (lang)
    {
        case 1:
            return `Article ${id} chargé.`;
        case 2:
            return `Article ${id} loaded.`;
        default:
            return `Article ${id} loaded.`;
    }
};

const failure_article_posted_but_not_in_authors_list = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Le nouvel article a été posté, mais il n\'a pas pu être ajouté à la liste de l\'auteur.';
        case 2:
            return 'Error: The new article has been posted, but it couldn\'t be added to the author\'s list.';
        default:
            return 'Error: The new article has been posted, but it couldn\'t be added to the author\'s list.';
    }
};

const success_article_posted = (lang, number) => 
{
    switch (lang)
    {
        case 1:
            return 'Nouvel article posté, et ' + number + ' articles chargés.';
        case 2:
            return 'New article posted, and ' + number + ' articles loaded.';
        default:
            return 'New article posted, and ' + number + ' articles loaded.';
    }
};

const failure_article_posted_but_no_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Le nouvel article a été posté, mais les articles n\'ont pu être chargés.';
        case 2:
            return 'Error: The new article has been posted, but the articles couldn\'t be loaded.';
        default:
            return 'Error: The new article has been posted, but the articles couldn\'t be loaded.';
    }
};

const failure_article_posted = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : L\'article ne peut être posté.';
        case 2:
            return 'Error: The article can\'t be posted.';
        default:
            return 'Error: The article can\'t be posted.';
    }
};

const success_article_modified = (lang, number) => 
{
    switch (lang)
    {
        case 1:
            return 'Article modifié, et ' + number + ' articles chargés.';
        case 2:
            return 'Article modified, and ' + articles.length + ' articles loaded.';
        default:
            return 'Article modified, and ' + articles.length + ' articles loaded.';
    }
};

const failure_article_modified_but_no_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : L\'article a été modifié, mais les articles n\'ont pu être chargés.';
        case 2:
            return 'Error: The article has been modified, but the articles couldn\'t be loaded.';
        default:
            return 'Error: The article has been modified, but the articles couldn\'t be loaded.';
    }
};

const failure_article_modified = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : L\'article ne peut être modifié.';
        case 2:
            return 'Error: The article can\'t be modified.';
        default:
            return 'Error: The article can\'t be modified.';
    }
};

const success_article_deleted = (lang, number) => 
{
    switch (lang)
    {
        case 1:
            return 'Article supprimé, et ' + number + ' articles chargés.';
        case 2:
            return 'Article deleted, and ' + articles.length + ' articles loaded.';
        default:
            return 'Article deleted, and ' + articles.length + ' articles loaded.';
    }
};

const failure_article_deleted_but_no_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : L\'article a été supprimé, mais les articles n\'ont pu être chargés.';
        case 2:
            return 'Error: The article has been deleted, but the articles couldn\'t be loaded.';
        default:
            return 'Error: The article has been deleted, but the articles couldn\'t be loaded.';
    }
};

const failure_article_deleted_but_still_in_authors_list = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : L\'article a été supprimé, mais il n\'a pas pu être retiré de la liste de l\'auteur.';
        case 2:
            return 'Error: The article has been deleted, but it couldn\'t be removed from the author\'s list.';
        default:
            return 'Error: The article has been deleted, but it couldn\'t be removed from the author\'s list.';
    }
};

const failure_article_deleted = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : L\'article ne peut être supprimé.';
        case 2:
            return 'Error: The article can\'t be deleted.';
        default:
            return 'Error: The article can\'t be deleted.';
    }
};

const success_categories_retrieval = (lang, number) => 
{
    switch (lang)
    {
        case 1:
            return number + ' catégories chargées.';
        case 2:
            return number + ' categories loaded.';
        default:
            return number + ' categories loaded.';
    }
};

const failure_categories_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Les catégories ne peuvent pas être retrouvées.';
        case 2:
            return 'Error: The categories can\'t be retrieved.';
        default:
            return 'Error: The categories can\'t be retrieved.';
    }
};

const success_category_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Catégorie retrouvée.';
        case 2:
            return 'Category retrieved.';
        default:
            return 'Category retrieved.';
    }
};

const failure_category_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : La catégorie n\'a pas pu être retrouvée.';
        case 2:
            return 'Error: The category can\'t be retrieved.';
        default:
            return 'Error: The category can\'t be retrieved.';
    }
};

const success_category_created = (lang, number) => 
{
    switch (lang)
    {
        case 1:
            return 'Catégorie créée, et ' + number + ' catégories chargées.';
        case 2:
            return 'Category created, and ' + number + ' categories loaded.';
        default:
            return 'Category created, and ' + number + ' categories loaded.';
    }
};

const failure_category_created_but_no_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : La catégorie a été créée, mais les catégories n\'ont pu être chargées.';
        case 2:
            return 'Error: The category has been created, but the categories couldn\'t be loaded.';
        default:
            return 'Error: The category has been created, but the categories couldn\'t be loaded.';
    }
};

const failure_category_created = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : La catégorie ne peut être créée.';
        case 2:
            return 'Error: The category can\'t be created.';
        default:
            return 'Error: The category can\'t be created.';
    }
};

const failure_category_modified = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : La catégorie ne peut être modifiée.';
        case 2:
            return 'Error: The category can\'t be modified.';
        default:
            return 'Error: The category can\'t be modified.';
    }
};

const success_category_modified = (lang, number) => 
{
    switch (lang)
    {
        case 1:
            return 'Catégorie modifiée, et ' + number + ' catégories chargées.';
        case 2:
            return 'Category modified, and ' + number + ' categories loaded.';
        default:
            return 'Category modified, and ' + number + ' categories loaded.';
    }
};

const failure_category_modified_but_no_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : La catégorie a été modifiée, mais les catégories n\'ont pu être chargées.';
        case 2:
            return 'Error: The category has been modified, but the categories couldn\'t be loaded.';
        default:
            return 'Error: The category has been modified, but the categories couldn\'t be loaded.';
    }
};

const failure_category_deletion_not_empty = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : La catégorie doit être vide d\'articles avant de pouvoir être supprimée.';
        case 2:
            return 'Error: The category must be void of articles before it can be deleted.';
        default:
            return 'Error: The category must be void of articles before it can be deleted.';
    }
};

const success_category_deleted = (lang, number) => 
{
    switch (lang)
    {
        case 1:
            return 'Catégorie supprimée, et ' + number + ' catégories chargées.';
        case 2:
            return 'Category deleted, and ' + number + ' categories loaded.';
        default:
            return 'Category deleted, and ' + number + ' categories loaded.';
    }
};

const failure_category_deleted_but_no_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : La catégorie a été supprimée, mais les catégories n\'ont pu être chargées.';
        case 2:
            return 'Error: The category has been deleted, but the categories couldn\'t be loaded.';
        default:
            return 'Error: The category has been deleted, but the categories couldn\'t be loaded.';
    }
};

const failure_category_deleted = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : La catégorie ne peut être supprimée.';
        case 2:
            return 'Error: The category can\'t be deleted.';
        default:
            return 'Error: The category can\'t be deleted.';
    }
};

const failure_article_not_found = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Il semblerait que l\'article n\'existe plus.';
        case 2:
            return 'Error: It seems like the article doesn\'t exist anymore.';
        default:
            return 'Error: It seems like the article doesn\'t exist anymore.';
    }
};

const failure_account_not_found = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Votre compte est introuvable.';
        case 2:
            return 'Error: Your account cannot be found.';
        default:
            return 'Error: Your account cannot be found.';
    }
};

const success_vote_counted = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Vote compté.';
        case 2:
            return 'Vote counted.';
        default:
            return 'Vote counted.';
    }
};

const failure_vote_counted = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Le vote n\'a pas pu être compté. Vous pouvez re-essayer.';
        case 2:
            return 'Error: The vote couldn\'t be counted. You may try again.';
        default:
            return 'Error: The vote couldn\'t be counted. You may try again.';
    }
};

/* FAQ ------------------------------------------------------------------------------------------ */

const success_questions_retrieval = (lang, number) => 
{
    switch (lang)
    {
        case 1:
            return number + ' questions chargées.';
        case 2:
            return number + ' questions loaded.';
        default:
            return number + ' questions loaded.';
    }
};

const failure_questions_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Les questions ne peuvent pas être retrouvées.';
        case 2:
            return 'Error: The questions can\'t be retrieved.';
        default:
            return 'Error: The questions can\'t be retrieved.';
    }
};

const success_question_created = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Question créée.';
        case 2:
            return 'Question created.';
        default:
            return 'Question created.';
    }
};

const failure_question_created = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : La question n\'a pas pu être créée.';
        case 2:
            return 'Error: The question couldn\'t be created.';
        default:
            return 'Error: The question couldn\'t be created.';
    }
};

const success_question_edited = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Question éditée.';
        case 2:
            return 'Question edited.';
        default:
            return 'Question edited.';
    }
};

const failure_question_edited = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : La question n\'a pas pu être éditée.';
        case 2:
            return 'Error: The question couldn\'t be edited.';
        default:
            return 'Error: The question couldn\'t be edited.';
    }
};

const success_question_removed = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Question retirée.';
        case 2:
            return 'Question removed.';
        default:
            return 'Question removed.';
    }
};

const failure_question_removed = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : La question n\'a pas pu être retirée.';
        case 2:
            return 'Error: The question couldn\'t be removed.';
        default:
            return 'Error: The question couldn\'t be removed.';
    }
};

/* TOKEN ---------------------------------------------------------------------------------------- */

const success_email_verified = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'L\'adresse email est validée.';
        case 2:
            return 'The email address is verified.';
        default:
            return 'The email address is verified.';
    }
};

const failure_expired_link = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Le lien a expiré.';
        case 2:
            return 'The link has expired.';
        default:
            return 'The link has expired.';
    }
};

const success_valid_link = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Le lien est valide.';
        case 2:
            return 'The link is valid.';
        default:
            return 'The link is valid.';
    }
};

/* CURRENCY ------------------------------------------------------------------------------------- */

const success_currencies_retrieval = (lang, number) => 
{
    switch (lang)
    {
        case 1:
            return number + ' devises chargées.';
        case 2:
            return number + ' currencies loaded.';
        default:
            return number + ' currencies loaded.';
    }
};

const failure_currencies_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Les devises ne peuvent pas être retrouvées.';
        case 2:
            return 'Error: The currencies can\'t be retrieved.';
        default:
            return 'Error: The currencies can\'t be retrieved.';
    }
};

/* LANGUAGE ------------------------------------------------------------------------------------- */

const success_languages_retrieval = (lang, number) => 
{
    switch (lang)
    {
        case 1:
            return number + ' langues chargées.';
        case 2:
            return number + ' languages loaded.';
        default:
            return number + ' languages loaded.';
    }
};

const failure_languages_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Les langues ne peuvent pas être retrouvées.';
        case 2:
            return 'Error: The languages can\'t be retrieved.';
        default:
            return 'Error: The languages can\'t be retrieved.';
    }
};

const failure_language_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : La langue ne peut pas être retrouvée.';
        case 2:
            return 'Error: The language can\'t be retrieved.';
        default:
            return 'Error: The language can\'t be retrieved.';
    }
};

const success_language_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Langue chargée.';
        case 2:
            return 'Language loaded.';
        default:
            return 'Language loaded.';
    }
};

/* RANK ----------------------------------------------------------------------------------------- */

const success_ranks_retrieval = (lang, number) => 
{
    switch (lang)
    {
        case 1:
            return number + ' grades chargés.';
        case 2:
            return number + ' ranks loaded.';
        default:
            return number + ' ranks loaded.';
    }
};

const failure_ranks_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Les grades ne peuvent pas être retrouvés.';
        case 2:
            return 'Error: The ranks can\'t be retrieved.';
        default:
            return 'Error: The ranks can\'t be retrieved.';
    }
};

const failure_rank_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Le grade ne peut pas être retrouvé.';
        case 2:
            return 'Error: The rank can\'t be retrieved.';
        default:
            return 'Error: The rank can\'t be retrieved.';
    }
};

const success_rank_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Grade chargé.';
        case 2:
            return 'Rank loaded.';
        default:
            return 'Rank loaded.';
    }
};

/* PRODUCT -------------------------------------------------------------------------------------- */

const success_full_products_retrieval = (lang, number) => 
{
    switch (lang)
    {
        case 1:
            return number + ' produits entiers chargés.';
        case 2:
            return number + ' full products loaded.';
        default:
            return number + ' full products loaded.';
    }
};

const failure_full_products_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Les produits entiers ne peuvent pas être retrouvés.';
        case 2:
            return 'Error: The full products can\'t be retrieved.';
        default:
            return 'Error: The full products can\'t be retrieved.';
    }
};

const success_full_product_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Produit entier chargé.';
        case 2:
            return 'Full product loaded.';
        default:
            return 'Full product loaded.';
    }
};

const failure_full_product_retrieval = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Le produit entier n\'a pas pu être retrouvé.';
        case 2:
            return 'Error: Full product couldn\'t be retrieved.';
        default:
            return 'Error: Full product couldn\'t be retrieved.';
    }
};

const success_product_created = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Produit créé.';
        case 2:
            return 'Product created.';
        default:
            return 'Product created.';
    }
};

const failure_product_created = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Le produit n\'a pas pu être créé.';
        case 2:
            return 'Error: Product couldn\'t be created.';
        default:
            return 'Error: Product couldn\'t be created.';
    }
};

const success_product_edited = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Produit édité.';
        case 2:
            return 'Product edited.';
        default:
            return 'Product edited.';
    }
};

const failure_product_edited = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Le produit n\'a pas pu être édité.';
        case 2:
            return 'Error: Product couldn\'t be edited.';
        default:
            return 'Error: Product couldn\'t be edited.';
    }
};

const success_product_removed = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Produit retiré.';
        case 2:
            return 'Product removed.';
        default:
            return 'Product removed.';
    }
};

const failure_product_removed = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Le produit n\'a pas pu être retiré.';
        case 2:
            return 'Error: Product couldn\'t be removed.';
        default:
            return 'Error: Product couldn\'t be removed.';
    }
};

const success_product_highlighted = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Produit mis en avant.';
        case 2:
            return 'Product highlighted.';
        default:
            return 'Product highlighted.';
    }
};

const failure_product_highlighted = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Le produit n\'a pas pu être mis en avant.';
        case 2:
            return 'Error: Product couldn\'t be highlighted.';
        default:
            return 'Error: Product couldn\'t be highlighted.';
    }
};

const success_products_retrieval_for_display = (lang, number) => 
{
    switch (lang)
    {
        case 1:
            return number + ' produits chargés pour l\'affichage.';
        case 2:
            return number + ' products loaded for display.';
        default:
            return number + ' products loaded for display.';
    }
};

const failure_products_retrieval_for_display = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Les produits ne peuvent pas être retrouvés pour l\'affichage.';
        case 2:
            return 'Error: The products can\'t be retrieved for display.';
        default:
            return 'Error: The products can\'t be retrieved for display.';
    }
};

const success_product_retrieval_for_display = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Produit chargé pour l\'affichage.';
        case 2:
            return 'Product loaded for display.';
        default:
            return 'Product loaded for display.';
    }
};

const failure_product_retrieval_for_display = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Le produit n\'a pas pu être retrouvé pour l\'affichage.';
        case 2:
            return 'Error: Product couldn\'t be retrieved for display.';
        default:
            return 'Error: Product couldn\'t be retrieved for display.';
    }
};

const success_highlighted_product_retrieval_for_display = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Produit du moment chargé pour l\'affichage.';
        case 2:
            return 'Highlighted product loaded for display.';
        default:
            return 'Highlighted product loaded for display.';
    }
};

const failure_highlighted_product_retrieval_for_display = (lang) => 
{
    switch (lang)
    {
        case 1:
            return 'Erreur : Le produit du moment n\'a pas pu être retrouvé pour l\'affichage.';
        case 2:
            return 'Error: Highlighted product couldn\'t be retrieved for display.';
        default:
            return 'Error: Highlighted product couldn\'t be retrieved for display.';
    }
};

module.exports = 
{
    short_lang,
    long_lang,
    failure,
    failure_try_again,
    success_message_sent,
    welcome_to_mofumofu,
    welcome_to_mofumofu_user,
    click_email_verification_link,
    user_is_subscribed_to_newsletter,
    suggest_subscription_to_newsletter,
    help_by_speaking_about_sc,
    help_by_leaving_message,
    failure_no_account_matches_this_email,
    failure_account_already_verified,
    failure_account_validation_email,
    success_account_validation_email,
    failure_account_not_subscribed_to_newsletter,
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
    failure_email_has_to_be_verified,
    success_password_email,
    nbr_loaded_newsletters,
    success_newsletter_saved_and_not_sent,
    failure_newsletter_saved_but_no_lang_subscriber,
    failure_newsletter_saved_but_not_sent,
    failure_newsletter_sent_but_none_found,
    success_newsletter_sent,
    failure_newsletter_sent_but_not_declared_as_sent,
    failure_admin_not_found,
    failure_admin_email_not_verified,
    failure_admin_no_password,
    failure_wrong_email_or_password,
    failure_email_has_to_be_verified,
    failure_no_password,
    failure_no_account_with_this_email,
    failure_empty_password,
    failure_password_creation,
    success_password_creation,
    failure_email_already_in_use,
    success_email_available,
    failure_username_already_in_use,
    success_username_available,
    failure_account_creation,
    success_account_creation,
    success_account_update,
    failure_account_update,
    success_account_deletion,
    failure_no_non_admin_user_found,
    success_stats,
    success_user_retrieval,
    failure_user_retrieval,
    success_articles_retrieval,
    failure_articles_retrieval,
    failure_article_retrieval,
    success_article_retrieval,
    failure_article_posted_but_not_in_authors_list,
    success_article_posted,
    failure_article_posted_but_no_retrieval,
    failure_article_posted,
    success_article_modified,
    failure_article_modified_but_no_retrieval,
    failure_article_modified,
    success_article_deleted,
    failure_article_deleted_but_no_retrieval,
    failure_article_deleted_but_still_in_authors_list,
    failure_article_deleted,
    success_categories_retrieval,
    failure_categories_retrieval,
    success_category_created,
    failure_category_created_but_no_retrieval,
    failure_category_created,
    failure_category_modified,
    success_category_modified,
    failure_category_modified_but_no_retrieval,
    failure_category_deletion_not_empty,
    success_category_deleted,
    failure_category_deleted_but_no_retrieval,
    failure_category_deleted,
    failure_article_not_found,
    failure_account_not_found,
    success_vote_counted,
    failure_vote_counted,
    success_questions_retrieval,
    failure_questions_retrieval,
    success_question_created,
    failure_question_created,
    success_question_edited,
    failure_question_edited,
    success_question_removed,
    failure_question_removed,
    success_email_verified,
    failure_expired_link,
    success_valid_link,
    success_currencies_retrieval,
    failure_currencies_retrieval,
    success_languages_retrieval,
    failure_languages_retrieval,
    failure_language_retrieval,
    success_language_retrieval,
    success_ranks_retrieval,
    failure_ranks_retrieval,
    failure_rank_retrieval,
    success_rank_retrieval,
    success_full_products_retrieval,
    failure_full_products_retrieval,
    success_full_product_retrieval,
    failure_full_product_retrieval,
    success_product_created,
    failure_product_created,
    success_product_edited,
    failure_product_edited,
    success_product_removed,
    failure_product_removed,
    success_product_highlighted,
    failure_product_highlighted,
    success_products_retrieval_for_display,
    failure_products_retrieval_for_display,
    success_product_retrieval_for_display,
    failure_product_retrieval_for_display,
    success_highlighted_product_retrieval_for_display,
    failure_highlighted_product_retrieval_for_display
};

