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
// CLEANING PLAN ELEMENTS
// ============================================================

const cleaningPlanSubtitle =
    document.getElementById(
        "cleaningPlanSubtitle"
    );

const noCleaningPlanState =
    document.getElementById(
        "noCleaningPlanState"
    );

const cleaningPlanContent =
    document.getElementById(
        "cleaningPlanContent"
    );

const cleaningPropertyName =
    document.getElementById(
        "cleaningPropertyName"
    );

const cleaningFloorName =
    document.getElementById(
        "cleaningFloorName"
    );

const cleaningPlanName =
    document.getElementById(
        "cleaningPlanName"
    );

const noCleaningTasksState =
    document.getElementById(
        "noCleaningTasksState"
    );

const cleaningTasksWrapper =
    document.getElementById(
        "cleaningTasksWrapper"
    );

const cleaningTaskList =
    document.getElementById(
        "cleaningTaskList"
    );

const cleaningTaskCount =
    document.getElementById(
        "cleaningTaskCount"
    );


// ============================================================
// CURRENT USER
// ============================================================

let currentSession =
    null;

let currentProfile =
    null;

let currentResident =
    null;

let currentCleaningPlan =
    null;

let currentCleaningTasks =
    [];


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
// DISPLAY FLOOR NAME
// ============================================================

function getFloorDisplayName(
    floor
) {

    if (!floor) {

        return "Ikke registrert";

    }


    if (floor.name) {

        return floor.name;

    }


    if (
        floor.floor_number !==
        null &&
        floor.floor_number !==
        undefined
    ) {

        return (
            floor.floor_number +
            ". etasje"
        );

    }


    return "Ikke registrert";

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

        floorName.textContent =
            "Etasje: " +
            getFloorDisplayName(
                floor
            );

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

        if (
            profile.role ===
            "admin" ||
            profile.role ===
            "superadmin"
        ) {

            window.location.href =
                "admin.html";

            return null;

        }


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
    // NO ASSOCIATION
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
// RESET CLEANING PLAN
// ============================================================

function resetCleaningPlanDisplay() {

    currentCleaningPlan =
        null;

    currentCleaningTasks =
        [];


    if (noCleaningPlanState) {

        noCleaningPlanState.hidden =
            true;

    }


    if (cleaningPlanContent) {

        cleaningPlanContent.hidden =
            true;

    }


    if (noCleaningTasksState) {

        noCleaningTasksState.hidden =
            true;

    }


    if (cleaningTasksWrapper) {

        cleaningTasksWrapper.hidden =
            true;

    }


    if (cleaningTaskCount) {

        cleaningTaskCount.hidden =
            true;

    }


    if (cleaningTaskList) {

        cleaningTaskList.innerHTML =
            "";

    }

}


// ============================================================
// LOAD CLEANING PLAN
// ============================================================

async function loadCleaningPlan() {

    resetCleaningPlanDisplay();


    if (!currentResident) {

        return;

    }


    if (
        !currentResident.property_id ||
        !currentResident.floor_id
    ) {

        if (noCleaningPlanState) {

            noCleaningPlanState.hidden =
                false;

        }

        return;

    }


    // ========================================================
    // LOAD PLAN FOR EXACT PROPERTY + FLOOR
    // ========================================================

    const {
        data: plan,
        error
    } =
        await supabaseClient
            .from("cleaning_plans")
            .select(
                `
                id,
                property_id,
                floor_id,
                name,
                start_date,
                is_active
                `
            )
            .eq(
                "property_id",
                currentResident.property_id
            )
            .eq(
                "floor_id",
                currentResident.floor_id
            )
            .eq(
                "is_active",
                true
            )
            .maybeSingle();


    if (error) {

        console.error(
            "LOAD CLEANING PLAN ERROR:",
            error
        );


        showPageError(
            "Kunne ikke hente rengjøringsplanen."
        );


        return;

    }


    // ========================================================
    // NO CLEANING PLAN
    // ========================================================

    if (!plan) {

        if (noCleaningPlanState) {

            noCleaningPlanState.hidden =
                false;

        }


        if (cleaningPlanSubtitle) {

            cleaningPlanSubtitle.textContent =
                "Ingen aktiv rengjøringsplan er opprettet ennå.";

        }


        return;

    }


    // ========================================================
    // PLAN FOUND
    // ========================================================

    currentCleaningPlan =
        plan;


    if (noCleaningPlanState) {

        noCleaningPlanState.hidden =
            true;

    }


    if (cleaningPlanContent) {

        cleaningPlanContent.hidden =
            false;

    }


    renderCleaningPlanInformation();


    await loadCleaningTasks();

}


// ============================================================
// RENDER CLEANING PLAN INFORMATION
// ============================================================

function renderCleaningPlanInformation() {

    if (!currentCleaningPlan) {

        return;

    }


    const property =
        currentResident?.properties;

    const floor =
        currentResident?.floors;


    if (cleaningPropertyName) {

        cleaningPropertyName.textContent =
            property?.name ||
            "-";

    }


    if (cleaningFloorName) {

        cleaningFloorName.textContent =
            getFloorDisplayName(
                floor
            );

    }


    if (cleaningPlanName) {

        cleaningPlanName.textContent =
            currentCleaningPlan.name ||
            "Rengjøringsplan";

    }


    if (cleaningPlanSubtitle) {

        cleaningPlanSubtitle.textContent =
            "Oppgavene for " +
            (
                property?.name ||
                "boligen"
            ) +
            " • " +
            getFloorDisplayName(
                floor
            );

    }

}


// ============================================================
// LOAD CLEANING TASKS
// ============================================================

async function loadCleaningTasks() {

    if (!currentCleaningPlan) {

        return;

    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "cleaning_plan_items"
            )
            .select(`
                id,
                plan_id,
                task_id,
                sort_order,

                cleaning_tasks (
                    id,
                    property_id,
                    floor_id,
                    name,
                    description,
                    sort_order,
                    is_active
                )
            `)
            .eq(
                "plan_id",
                currentCleaningPlan.id
            )
            .order(
                "sort_order",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(
            "LOAD CLEANING TASKS ERROR:",
            error
        );


        showPageError(
            "Kunne ikke hente rengjøringsoppgavene."
        );


        return;

    }


    // ========================================================
    // ONLY ACTIVE TASKS
    // ========================================================

    currentCleaningTasks =
        (data || [])
            .filter(
                function (item) {

                    return (
                        item.cleaning_tasks &&
                        item.cleaning_tasks.is_active
                    );

                }
            );


    renderCleaningTasks();

}


// ============================================================
// RENDER CLEANING TASKS
// ============================================================

function renderCleaningTasks() {

    if (cleaningTaskList) {

        cleaningTaskList.innerHTML =
            "";

    }


    // ========================================================
    // NO TASKS
    // ========================================================

    if (
        currentCleaningTasks.length ===
        0
    ) {

        if (noCleaningTasksState) {

            noCleaningTasksState.hidden =
                false;

        }


        if (cleaningTasksWrapper) {

            cleaningTasksWrapper.hidden =
                true;

        }


        if (cleaningTaskCount) {

            cleaningTaskCount.hidden =
                true;

        }


        return;

    }


    // ========================================================
    // TASKS FOUND
    // ========================================================

    if (noCleaningTasksState) {

        noCleaningTasksState.hidden =
            true;

    }


    if (cleaningTasksWrapper) {

        cleaningTasksWrapper.hidden =
            false;

    }


    currentCleaningTasks.forEach(
        function (
            item,
            index
        ) {

            const task =
                item.cleaning_tasks;


            const taskRow =
                document.createElement(
                    "div"
                );


            taskRow.className =
                "resident-cleaning-task-row";


            // =================================================
            // CHECKBOX
            // =================================================
            //
            // Disabled for now.
            //
            // In the next step this becomes interactive only
            // for the resident responsible for the selected week.
            //
            // =================================================

            const checkbox =
                document.createElement(
                    "input"
                );


            checkbox.type =
                "checkbox";


            checkbox.disabled =
                true;


            checkbox.className =
                "resident-cleaning-checkbox";


            // =================================================
            // CONTENT
            // =================================================

            const content =
                document.createElement(
                    "div"
                );


            content.className =
                "resident-cleaning-task-content";


            const title =
                document.createElement(
                    "div"
                );


            title.className =
                "resident-cleaning-task-title";


            title.textContent =
                task.name;


            content.appendChild(
                title
            );


            if (task.description) {

                const description =
                    document.createElement(
                        "div"
                    );


                description.className =
                    "resident-cleaning-task-description";


                description.textContent =
                    task.description;


                content.appendChild(
                    description
                );

            }


            taskRow.appendChild(
                checkbox
            );


            taskRow.appendChild(
                content
            );


            cleaningTaskList.appendChild(
                taskRow
            );

        }
    );


    // ========================================================
    // COUNT
    // ========================================================

    if (cleaningTaskCount) {

        cleaningTaskCount.textContent =
            currentCleaningTasks.length +
            (
                currentCleaningTasks.length ===
                1
                    ? " oppgave"
                    : " oppgaver"
            );


        cleaningTaskCount.hidden =
            false;

    }

}


// ============================================================
// INITIALIZE RESIDENT PAGE
// ============================================================

async function initResidentPage() {

    // ========================================================
    // LOADING
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

    const associationResult =
        await loadResidentAssociation(
            result.profile.id
        );


    if (
        !associationResult ||
        !associationResult.success
    ) {

        return;

    }


    // ========================================================
    // NO PROPERTY / FLOOR YET
    // ========================================================

    if (
        !associationResult.resident
    ) {

        return;

    }


    // ========================================================
    // CLEANING PLAN
    // ========================================================

    await loadCleaningPlan();

}


// ============================================================
// START
// ============================================================

initResidentPage();