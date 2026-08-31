// ============================================================
// CLEANING APP
// AUTHENTICATION
// ============================================================


const loginForm =
    document.getElementById("loginForm");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const loginButton =
    document.getElementById("loginButton");

const forgotPasswordButton =
    document.getElementById("forgotPasswordButton");

const loginMessage =
    document.getElementById("loginMessage");


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
        "message " + type;
}


// ============================================================
// REDIRECT BY ROLE
// ============================================================

async function redirectByRole(userId) {

    const {
        data: profile,
        error
    } =
        await supabaseClient
            .from("profiles")
            .select(
                "id, full_name, email, role, is_active"
            )
            .eq("id", userId)
            .single();


    if (error || !profile) {

        console.error(error);

        await supabaseClient.auth.signOut();

        showMessage(
            "Kunne ikke finne brukerprofilen.",
            "error"
        );

        return;
    }


    if (!profile.is_active) {

        await supabaseClient.auth.signOut();

        showMessage(
            "Denne kontoen er deaktivert.",
            "error"
        );

        return;
    }


    switch (profile.role) {

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

            await supabaseClient.auth.signOut();

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
        async function (event) {

            event.preventDefault();


            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;


            if (!email || !password) {

                showMessage(
                    "Fyll inn e-post og passord.",
                    "error"
                );

                return;
            }


            loginButton.disabled = true;

            loginButton.textContent =
                "Logger inn...";


            showMessage("");


            const {
                data,
                error
            } =
                await supabaseClient.auth
                    .signInWithPassword({
                        email,
                        password
                    });


            console.log(
                "AUTH USER:",
                data.user
            );

            console.log(
                "AUTH USER ID:",
                data.user?.id
            );


            if (error) {

                console.error(error);

                showMessage(
                    "Feil e-post eller passord.",
                    "error"
                );

                loginButton.disabled = false;

                loginButton.textContent =
                    "Logg inn";

                return;
            }


            await redirectByRole(
                data.user.id
            );

        }
    );
}


// ============================================================
// CHECK EXISTING SESSION
// ============================================================

async function checkExistingSession() {

    const {
        data: { session }
    } =
        await supabaseClient.auth
            .getSession();


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