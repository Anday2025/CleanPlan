// ============================================================
// CLEANING APP
// AUTHENTICATION
// ============================================================


// ============================================================
// LOGIN ELEMENTS
// ============================================================

const loginForm =
    document.getElementById(
        "loginForm"
    );

const emailInput =
    document.getElementById(
        "email"
    );

const passwordInput =
    document.getElementById(
        "password"
    );

const loginButton =
    document.getElementById(
        "loginButton"
    );

const forgotPasswordButton =
    document.getElementById(
        "forgotPasswordButton"
    );

const loginMessage =
    document.getElementById(
        "loginMessage"
    );


// ============================================================
// LOGIN MODAL ELEMENTS
// ============================================================

const loginModal =
    document.getElementById(
        "loginModal"
    );

const openLoginButton =
    document.getElementById(
        "openLoginButton"
    );

const closeLoginButton =
    document.getElementById(
        "closeLoginButton"
    );

const loginModalBackdrop =
    document.getElementById(
        "loginModalBackdrop"
    );


// ============================================================
// MESSAGE
// ============================================================

function showMessage(
    message,
    type = ""
) {

    if (!loginMessage) {
        return;
    }


    loginMessage.textContent =
        message;


    loginMessage.className =
        "message " +
        type;

}


// ============================================================
// OPEN LOGIN MODAL
// ============================================================

function openLoginModal() {

    if (!loginModal) {
        return;
    }


    loginModal.hidden =
        false;


    document.body.classList.add(
        "login-modal-open"
    );


    if (openLoginButton) {

        openLoginButton.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    window.setTimeout(
        function () {

            if (emailInput) {

                emailInput.focus();

            }

        },
        50
    );

}


// ============================================================
// CLOSE LOGIN MODAL
// ============================================================

function closeLoginModal() {

    if (!loginModal) {
        return;
    }


    loginModal.hidden =
        true;


    document.body.classList.remove(
        "login-modal-open"
    );


    if (openLoginButton) {

        openLoginButton.setAttribute(
            "aria-expanded",
            "false"
        );

        openLoginButton.focus();

    }

}


// ============================================================
// OPEN LOGIN BUTTON
// ============================================================

if (openLoginButton) {

    openLoginButton.addEventListener(
        "click",
        function () {

            openLoginModal();

        }
    );

}


// ============================================================
// CLOSE LOGIN BUTTON
// ============================================================

if (closeLoginButton) {

    closeLoginButton.addEventListener(
        "click",
        function () {

            closeLoginModal();

        }
    );

}


// ============================================================
// CLICK ON BACKDROP
// ============================================================

if (loginModalBackdrop) {

    loginModalBackdrop.addEventListener(
        "click",
        function () {

            closeLoginModal();

        }
    );

}


// ============================================================
// ESCAPE KEY
// ============================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !==
            "Escape"
        ) {

            return;

        }


        if (
            !loginModal ||
            loginModal.hidden
        ) {

            return;

        }


        closeLoginModal();

    }
);


// ============================================================
// REDIRECT BY ROLE
// ============================================================

async function redirectByRole(
    userId
) {

    const {
        data: profile,
        error
    } =
        await supabaseClient
            .from(
                "profiles"
            )
            .select(
                "id, full_name, email, role, is_active"
            )
            .eq(
                "id",
                userId
            )
            .single();


    if (
        error ||
        !profile
    ) {

        console.error(
            "PROFILE ERROR:",
            error
        );


        await supabaseClient
            .auth
            .signOut();


        showMessage(
            "Kunne ikke finne brukerprofilen.",
            "error"
        );


        return;

    }


    if (!profile.is_active) {

        await supabaseClient
            .auth
            .signOut();


        showMessage(
            "Denne kontoen er deaktivert.",
            "error"
        );


        return;

    }


    switch (
        profile.role
        ) {

        case "superadmin":

        case "admin":

            window.location.href =
                "admin.html";

            break;


        case "resident":

            window.location.href =
                "resident.html";

            break;


        default:

            await supabaseClient
                .auth
                .signOut();


            showMessage(
                "Ugyldig brukerrolle.",
                "error"
            );

    }

}


// ============================================================
// LOGIN
// ============================================================

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (
            event
        ) {

            event.preventDefault();


            const email =
                emailInput
                    ? emailInput.value.trim()
                    : "";


            const password =
                passwordInput
                    ? passwordInput.value
                    : "";


            if (
                !email ||
                !password
            ) {

                showMessage(
                    "Fyll inn e-post og passord.",
                    "error"
                );


                return;

            }


            if (loginButton) {

                loginButton.disabled =
                    true;


                loginButton.textContent =
                    "Logger inn...";

            }


            showMessage(
                ""
            );


            const {
                data,
                error
            } =
                await supabaseClient
                    .auth
                    .signInWithPassword(
                        {
                            email,
                            password
                        }
                    );


            if (error) {

                console.error(
                    "LOGIN ERROR:",
                    error
                );


                showMessage(
                    "Feil e-post eller passord.",
                    "error"
                );


                if (loginButton) {

                    loginButton.disabled =
                        false;


                    loginButton.textContent =
                        "LOGG INN";

                }


                return;

            }


            if (
                !data ||
                !data.user
            ) {

                showMessage(
                    "Kunne ikke logge inn.",
                    "error"
                );


                if (loginButton) {

                    loginButton.disabled =
                        false;


                    loginButton.textContent =
                        "LOGG INN";

                }


                return;

            }


            await redirectByRole(
                data.user.id
            );

        }
    );

}


// ============================================================
// FORGOT PASSWORD
// ============================================================

if (forgotPasswordButton) {

    forgotPasswordButton.addEventListener(
        "click",
        async function () {

            const email =
                emailInput
                    ? emailInput.value.trim()
                    : "";


            if (!email) {

                showMessage(
                    "Skriv inn e-postadressen din først.",
                    "error"
                );


                if (emailInput) {

                    emailInput.focus();

                }


                return;

            }


            forgotPasswordButton.disabled =
                true;


            showMessage(
                "Sender tilbakestillingslenke...",
                "info"
            );


            const {
                error
            } =
                await supabaseClient
                    .auth
                    .resetPasswordForEmail(
                        email,
                        {
                            redirectTo:
                                window.location
                                    .origin +
                                window.location
                                    .pathname
                                    .replace(
                                        /index\.html$/,
                                        ""
                                    ) +
                                "reset-password.html"
                        }
                    );


            if (error) {

                console.error(
                    "RESET PASSWORD ERROR:",
                    error
                );


                showMessage(
                    "Kunne ikke sende tilbakestillingslenken.",
                    "error"
                );


                forgotPasswordButton.disabled =
                    false;


                return;

            }


            showMessage(
                "Tilbakestillingslenke er sendt til e-posten din.",
                "success"
            );


            forgotPasswordButton.disabled =
                false;

        }
    );

}


// ============================================================
// CHECK EXISTING SESSION
// ============================================================

async function checkExistingSession() {

    const {
        data: {
            session
        },
        error
    } =
        await supabaseClient
            .auth
            .getSession();


    if (error) {

        console.error(
            "SESSION ERROR:",
            error
        );


        return;

    }


    if (!session) {

        return;

    }


    await redirectByRole(
        session.user.id
    );

}


// ============================================================
// START
// ============================================================

checkExistingSession();