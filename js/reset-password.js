
// ============================================================
// CLEANING APP
// RESET PASSWORD / INVITATION
// ============================================================


// ============================================================
// ELEMENTS
// ============================================================

const resetPasswordForm =
    document.getElementById("resetPasswordForm");

const newPasswordInput =
    document.getElementById("newPassword");

const confirmPasswordInput =
    document.getElementById("confirmPassword");

const resetPasswordButton =
    document.getElementById("resetPasswordButton");

const resetPasswordMessage =
    document.getElementById("resetPasswordMessage");


// ============================================================
// MESSAGE
// ============================================================

function showMessage(
    message,
    type = ""
) {

    if (!resetPasswordMessage) {
        return;
    }

    resetPasswordMessage.textContent =
        message;

    resetPasswordMessage.className =
        "message " + type;
}


// ============================================================
// WAIT FOR SUPABASE AUTH SESSION
// ============================================================
//
// Supabase invitation links contain authentication
// information in the URL hash:
//
// #access_token=...
// &refresh_token=...
// &type=invite
//
// Supabase JS normally processes this automatically.
// We wait briefly and then verify the session.
//
// ============================================================

async function waitForInviteSession() {

    // --------------------------------------------------------
    // First attempt
    // --------------------------------------------------------

    let {
        data: { session },
        error
    } =
        await supabaseClient.auth.getSession();


    if (error) {

        console.error(
            "GET SESSION ERROR:",
            error
        );

        return null;

    }


    if (session) {

        return session;

    }


    // --------------------------------------------------------
    // Give Supabase Auth time to process the URL hash
    // --------------------------------------------------------

    await new Promise(
        function (resolve) {

            setTimeout(
                resolve,
                500
            );

        }
    );


    const {
        data: { session: secondSession },
        error: secondError
    } =
        await supabaseClient.auth.getSession();


    if (secondError) {

        console.error(
            "SECOND GET SESSION ERROR:",
            secondError
        );

        return null;

    }


    return secondSession || null;

}


// ============================================================
// CHECK INVITATION SESSION
// ============================================================

async function checkResetSession() {

    const session =
        await waitForInviteSession();


    if (!session) {

        console.error(
            "NO INVITATION SESSION FOUND"
        );


        showMessage(
            "Invitasjonslenken er ikke gyldig, har utløpt eller kan ikke brukes. Be administrator sende en ny invitasjon.",
            "error"
        );


        if (resetPasswordButton) {

            resetPasswordButton.disabled =
                true;

        }


        return false;

    }


    // --------------------------------------------------------
    // Log only safe information
    // --------------------------------------------------------

    console.log(
        "INVITATION SESSION FOUND"
    );

    console.log(
        "INVITED USER ID:",
        session.user?.id
    );

    console.log(
        "INVITED USER EMAIL:",
        session.user?.email
    );


    // --------------------------------------------------------
    // Make sure this is actually an authenticated user
    // --------------------------------------------------------

    if (!session.user) {

        showMessage(
            "Kunne ikke finne den inviterte brukeren.",
            "error"
        );


        if (resetPasswordButton) {

            resetPasswordButton.disabled =
                true;

        }


        return false;

    }


    return true;

}


// ============================================================
// UPDATE PASSWORD
// ============================================================

if (resetPasswordForm) {

    resetPasswordForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // ------------------------------------------------
            // VALUES
            // ------------------------------------------------

            const newPassword =
                newPasswordInput
                    ? newPasswordInput.value
                    : "";


            const confirmPassword =
                confirmPasswordInput
                    ? confirmPasswordInput.value
                    : "";


            // ------------------------------------------------
            // VALIDATION
            // ------------------------------------------------

            if (
                !newPassword ||
                !confirmPassword
            ) {

                showMessage(
                    "Fyll inn begge passordfeltene.",
                    "error"
                );

                return;

            }


            if (
                newPassword.length < 8
            ) {

                showMessage(
                    "Passordet må være minst 8 tegn.",
                    "error"
                );

                return;

            }


            if (
                newPassword !==
                confirmPassword
            ) {

                showMessage(
                    "Passordene er ikke like.",
                    "error"
                );

                return;

            }


            // ------------------------------------------------
            // DISABLE BUTTON
            // ------------------------------------------------

            if (resetPasswordButton) {

                resetPasswordButton.disabled =
                    true;

                resetPasswordButton.textContent =
                    "Lagrer...";

            }


            showMessage(
                "Lagrer nytt passord...",
                "info"
            );


            try {

                // ------------------------------------------------
                // VERIFY INVITATION SESSION
                // ------------------------------------------------

                const sessionValid =
                    await checkResetSession();


                if (!sessionValid) {

                    return;

                }


                // ------------------------------------------------
                // UPDATE PASSWORD
                // ------------------------------------------------

                const {
                    data,
                    error
                } =
                    await supabaseClient.auth
                        .updateUser({
                            password:
                                newPassword
                        });


                console.log(
                    "PASSWORD UPDATE:",
                    error
                        ? "ERROR"
                        : "SUCCESS"
                );


                // ------------------------------------------------
                // ERROR
                // ------------------------------------------------

                if (error) {

                    console.error(
                        "PASSWORD UPDATE ERROR:",
                        error
                    );


                    showMessage(
                        error.message ||
                        "Kunne ikke lagre det nye passordet.",
                        "error"
                    );

                    return;

                }


                // ------------------------------------------------
                // SUCCESS
                // ------------------------------------------------

                showMessage(
                    "Passordet er lagret. Du blir sendt til innlogging...",
                    "success"
                );


                // ------------------------------------------------
                // CLEAR PASSWORD FIELDS
                // ------------------------------------------------

                if (newPasswordInput) {

                    newPasswordInput.value =
                        "";

                }


                if (confirmPasswordInput) {

                    confirmPasswordInput.value =
                        "";

                }


                // ------------------------------------------------
                // SIGN OUT
                // ------------------------------------------------
                //
                // The invitation session is only used to
                // establish the password.
                //
                // After the password has been created,
                // the Resident should log in normally.
                //
                // ------------------------------------------------

                await supabaseClient.auth.signOut();


                // ------------------------------------------------
                // REDIRECT TO LOGIN
                // ------------------------------------------------

                setTimeout(
                    function () {

                        window.location.href =
                            "index.html";

                    },
                    1500
                );

            } catch (error) {

                console.error(
                    "RESET PASSWORD EXCEPTION:",
                    error
                );


                showMessage(
                    "Det oppstod en feil. Prøv å åpne invitasjonslenken på nytt.",
                    "error"
                );

            } finally {

                if (resetPasswordButton) {

                    resetPasswordButton.disabled =
                        false;

                    resetPasswordButton.textContent =
                        "Lagre passord";

                }

            }

        }
    );

}


// ============================================================
// AUTH STATE LISTENER
// ============================================================
//
// This helps when Supabase finishes processing the
// invitation URL after the page has loaded.
//
// ============================================================

supabaseClient.auth.onAuthStateChange(
    function (event, session) {

        console.log(
            "AUTH EVENT:",
            event
        );


        if (
            event ===
            "SIGNED_IN" &&
            session
        ) {

            console.log(
                "INVITATION SESSION READY"
            );

        }

    }
);


// ============================================================
// START
// ============================================================

async function start() {

    console.log(
        "RESET PASSWORD PAGE STARTED"
    );


    await checkResetSession();

}


start();
