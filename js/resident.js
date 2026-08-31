// ============================================================
// CLEANING APP
// RESIDENT DASHBOARD
// ============================================================


// ============================================================
// ELEMENTS
// ============================================================

const logoutButton =
    document.getElementById(
        "logoutButton"
    );

const residentName =
    document.getElementById(
        "residentName"
    );

const welcomeTitle =
    document.getElementById(
        "welcomeTitle"
    );

const loadingSection =
    document.getElementById(
        "loadingSection"
    );

const waitingSection =
    document.getElementById(
        "waitingSection"
    );

const residentSection =
    document.getElementById(
        "residentSection"
    );

const cleaningSection =
    document.getElementById(
        "cleaningSection"
    );

const errorSection =
    document.getElementById(
        "errorSection"
    );

const residentPageMessage =
    document.getElementById(
        "residentPageMessage"
    );

const propertyName =
    document.getElementById(
        "propertyName"
    );

const propertyAddress =
    document.getElementById(
        "propertyAddress"
    );

const floorName =
    document.getElementById(
        "floorName"
    );


// ============================================================
// CURRENT USER
// ============================================================

let currentSession = null;

let currentProfile = null;

let currentResident = null;


// ============================================================
// LOGOUT
// ============================================================

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async function () {

            await supabaseClient.auth.signOut();

            window.location.href =
                "index.html";

        }
    );

}


// ============================================================
// HIDE ALL CONTENT SECTIONS
// ============================================================

function hideContentSections() {

    if (waitingSection) {

        waitingSection.hidden =
            true;

    }


    if (residentSection) {

        residentSection.hidden =
            true;

    }


    if (cleaningSection) {

        cleaningSection.hidden =
            true;

    }


    if (errorSection) {

        errorSection.hidden =
            true;

    }

}


// ============================================================
// SHOW ERROR
// ============================================================

function showPageError(
    message
) {

    if (loadingSection) {

        loadingSection.hidden =
            true;

    }


    hideContentSections();


    if (residentPageMessage) {

        residentPageMessage.textContent =
            message;

    }


    if (errorSection) {

        errorSection.hidden =
            false;

    }

}


// ============================================================
// SHOW WAITING STATE
// ============================================================

function showWaitingState() {

    if (loadingSection) {

        loadingSection.hidden =
            true;

    }


    hideContentSections();


    if (waitingSection) {

        waitingSection.hidden =
            false;

    }

}


// ============================================================
// SHOW RESIDENT DASHBOARD
// ============================================================

function showResidentDashboard(
    resident
) {

    if (loadingSection) {

        loadingSection.hidden =
            true;

    }


    hideContentSections();


    const property =
        resident.properties;

    const floor =
        resident.floors;


    // ========================================================
    // PROPERTY
    // ========================================================

    if (propertyName) {

        propertyName.textContent =
            property?.name ||
            "Bolig";

    }


    if (propertyAddress) {

        propertyAddress.textContent =
            property?.address ||
            "Ingen adresse registrert";

    }


    // ========================================================
    // FLOOR
    // ========================================================

    if (floorName) {

        let displayFloor =
            "Ikke registrert";


        if (floor) {

            displayFloor =
                floor.name ||
                (
                    floor.floor_number !==
                    null &&
                    floor.floor_number !==
                    undefined
                        ? floor.floor_number +
                        ". etasje"
                        : "Ikke registrert"
                );

        }


        floorName.textContent =
            "Etasje: " +
            displayFloor;

    }


    // ========================================================
    // SHOW CONTENT
    // ========================================================

    if (residentSection) {

        residentSection.hidden =
            false;

    }


    if (cleaningSection) {

        cleaningSection.hidden =
            false;

    }

}


// ============================================================
// LOAD SESSION
// ============================================================

async function loadSession() {

    const {
        data: {
            session
        },
        error
    } =
        await supabaseClient.auth.getSession();


    if (
        error ||
        !session
    ) {

        window.location.href =
            "index.html";

        return null;

    }


    currentSession =
        session;


    return session;

}


// ============================================================
// LOAD PROFILE
// ============================================================

async function loadProfile(
    userId
) {

    const {
        data: profile,
        error
    } =
        await supabaseClient
            .from("profiles")
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
            "RESIDENT PROFILE ERROR:",
            error
        );

        return null;

    }


    currentProfile =
        profile;


    return profile;

}


// ============================================================
// CHECK RESIDENT ACCESS
// ============================================================

async function checkResidentAccess() {

    const session =
        await loadSession();


    if (!session) {

        return null;

    }


    const profile =
        await loadProfile(
            session.user.id
        );


    // ========================================================
    // PROFILE COULD NOT BE LOADED
    // ========================================================

    if (!profile) {

        await supabaseClient.auth.signOut();

        window.location.href =
            "index.html";

        return null;

    }


    // ========================================================
    // INACTIVE ACCOUNT
    // ========================================================

    if (!profile.is_active) {

        await supabaseClient.auth.signOut();

        window.location.href =
            "index.html";

        return null;

    }


    // ========================================================
    // WRONG ROLE
    // ========================================================

    if (
        profile.role !==
        "resident"
    ) {

        // ----------------------------------------------------
        // ADMIN / SUPERADMIN
        // ----------------------------------------------------

        if (
            profile.role === "admin" ||
            profile.role === "superadmin"
        ) {

            window.location.href =
                "admin.html";

            return null;

        }


        // ----------------------------------------------------
        // UNKNOWN ROLE
        // ----------------------------------------------------

        await supabaseClient.auth.signOut();

        window.location.href =
            "index.html";

        return null;

    }


    // ========================================================
    // HEADER
    // ========================================================

    if (residentName) {

        residentName.textContent =
            profile.full_name;

    }


    if (welcomeTitle) {

        welcomeTitle.textContent =
            "Velkommen, " +
            profile.full_name;

    }


    return {
        session,
        profile
    };

}


// ============================================================
// LOAD RESIDENT ASSOCIATION
// ============================================================

async function loadResidentAssociation(
    profileId
) {

    const {
        data,
        error
    } =
        await supabaseClient
            .from("residents")
            .select(`
                id,
                profile_id,
                property_id,
                floor_id,
                is_active,
                created_at,

                properties (
                    id,
                    name,
                    address
                ),

                floors (
                    id,
                    floor_number,
                    name
                )
            `)
            .eq(
                "profile_id",
                profileId
            )
            .eq(
                "is_active",
                true
            )
            .maybeSingle();


    // ========================================================
    // DATABASE ERROR
    // ========================================================

    if (error) {

        console.error(
            "LOAD RESIDENT ASSOCIATION ERROR:",
            error
        );


        showPageError(
            "Kunne ikke hente boligtilknytningen din."
        );


        return {
            success: false,
            resident: null
        };

    }


    // ========================================================
    // NO ASSOCIATION YET
    // ========================================================
    //
    // IMPORTANT:
    //
    // This is NOT an authentication error.
    //
    // The Resident account exists and remains logged in.
    // The administrator simply has not connected the profile
    // to a property and floor yet.
    //
    // ========================================================

    if (!data) {

        currentResident =
            null;


        showWaitingState();


        return {
            success: true,
            resident: null
        };

    }


    // ========================================================
    // ASSOCIATION FOUND
    // ========================================================

    currentResident =
        data;


    showResidentDashboard(
        data
    );


    return {
        success: true,
        resident: data
    };

}


// ============================================================
// INITIALIZE RESIDENT PAGE
// ============================================================

async function initResidentPage() {

    // ========================================================
    // START WITH LOADING STATE
    // ========================================================

    hideContentSections();


    if (loadingSection) {

        loadingSection.hidden =
            false;

    }


    // ========================================================
    // AUTHORIZATION
    // ========================================================

    const result =
        await checkResidentAccess();


    if (!result) {

        return;

    }


    // ========================================================
    // RESIDENT ASSOCIATION
    // ========================================================

    await loadResidentAssociation(
        result.profile.id
    );

}


// ============================================================
// START
// ============================================================

initResidentPage();