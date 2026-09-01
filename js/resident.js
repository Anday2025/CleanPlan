
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


// ============================================================
// CURRENT WEEK ELEMENTS
// ============================================================

const currentWeekHeading =
    document.getElementById(
        "currentWeekHeading"
    );

const currentWeekStatus =
    document.getElementById(
        "currentWeekStatus"
    );

const currentWeekDate =
    document.getElementById(
        "currentWeekDate"
    );

const currentWeekResponsible =
    document.getElementById(
        "currentWeekResponsible"
    );

const currentWeekFloor =
    document.getElementById(
        "currentWeekFloor"
    );


// ============================================================
// WEEK NAVIGATION ELEMENTS
// ============================================================

const previousWeekButton =
    document.getElementById(
        "previousWeekButton"
    );

const nextWeekButton =
    document.getElementById(
        "nextWeekButton"
    );

const selectedWeekNumber =
    document.getElementById(
        "selectedWeekNumber"
    );

const selectedWeekYear =
    document.getElementById(
        "selectedWeekYear"
    );

const selectedWeekDate =
    document.getElementById(
        "selectedWeekDate"
    );

const selectedWeekResponsible =
    document.getElementById(
        "selectedWeekResponsible"
    );

const selectedWeekStatus =
    document.getElementById(
        "selectedWeekStatus"
    );

const weekPreviewList =
    document.getElementById(
        "weekPreviewList"
    );


// ============================================================
// TASK ELEMENTS
// ============================================================

const cleaningTaskList =
    document.getElementById(
        "cleaningTaskList"
    );

const cleaningTasksWrapper =
    document.getElementById(
        "cleaningTasksWrapper"
    );

const cleaningTaskCount =
    document.getElementById(
        "cleaningTaskCount"
    );

const noCleaningTasksState =
    document.getElementById(
        "noCleaningTasksState"
    );

const taskPermissionMessage =
    document.getElementById(
        "taskPermissionMessage"
    );

const cleaningPermissionText =
    document.getElementById(
        "cleaningPermissionText"
    );


// ============================================================
// CAMERA ELEMENTS
// ============================================================

const cameraInput =
    document.getElementById(
        "cameraInput"
    );

const cameraButton =
    document.getElementById(
        "cameraButton"
    );

const photoPreviewGrid =
    document.getElementById(
        "photoPreviewGrid"
    );

const photoCount =
    document.getElementById(
        "photoCount"
    );


// ============================================================
// CONFIRM ELEMENTS
// ============================================================

const signedByName =
    document.getElementById(
        "signedByName"
    );

const confirmWeekNumber =
    document.getElementById(
        "confirmWeekNumber"
    );

const confirmCleaningButton =
    document.getElementById(
        "confirmCleaningButton"
    );

const responsibleOnlyMessage =
    document.getElementById(
        "responsibleOnlyMessage"
    );


// ============================================================
// STATE
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

let currentPlanMembers =
    [];


// ============================================================
// WEEK ASSIGNMENTS
// ============================================================

/*
 * Lagrede uke-tildelinger fra cleaning_week_assignments.
 *
 * Disse skal være første kilde til hvem som faktisk
 * er ansvarlig for en bestemt uke.
 *
 * Rotasjonen i cleaning_plan_members brukes som fallback
 * dersom en uke ennå ikke har en lagret assignment.
 */

let currentWeekAssignments =
    [];


// ============================================================
// CLEANING COMPLETIONS
// ============================================================

/*
 * Fullførte oppgaver for den valgte uken.
 * Data hentes fra cleaning_completions og brukes til å
 * gjenopprette checkbox-status etter refresh/ukebytte.
 */

let currentCleaningCompletions =
    [];


let currentWeekFriday =
    null;

let selectedFriday =
    null;

let selectedResponsibleMember =
    null;

let selectedPhotos =
    [];


// ============================================================
// CONSTANTS
// ============================================================

const MAX_PHOTOS =
    6;


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
// HIDE CONTENT
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
// ERROR
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
// WAITING STATE
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
// FLOOR NAME
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
// DATE HELPERS
// ============================================================

function createLocalDateFromIso(
    isoDate
) {

    const parts =
        isoDate.split("-");


    return new Date(
        Number(parts[0]),
        Number(parts[1]) - 1,
        Number(parts[2]),
        12,
        0,
        0,
        0
    );

}


// ============================================================
// DATE TO ISO
// ============================================================

function dateToIso(
    date
) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return (
        year +
        "-" +
        month +
        "-" +
        day
    );

}


// ============================================================
// CLONE DATE
// ============================================================

function cloneDate(
    date
) {

    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        12,
        0,
        0,
        0
    );

}


// ============================================================
// ADD DAYS
// ============================================================

function addDays(
    date,
    days
) {

    const result =
        cloneDate(
            date
        );


    result.setDate(
        result.getDate() +
        days
    );


    return result;

}


// ============================================================
// GET FRIDAY FOR CURRENT CLEANING WEEK
// ============================================================

function getCurrentCleaningFriday() {

    const now =
        new Date();


    const date =
        new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            12,
            0,
            0,
            0
        );


    const day =
        date.getDay();


    let difference =
        5 -
        day;


    if (
        day ===
        6
    ) {

        difference =
            6;

    }


    date.setDate(
        date.getDate() +
        difference
    );


    return date;

}


// ============================================================
// DISPLAY DATE
// ============================================================

function formatDisplayDate(
    date
) {

    return new Intl.DateTimeFormat(
        "nb-NO",
        {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    ).format(
        date
    );

}


// ============================================================
// SHORT DATE
// ============================================================

function formatShortDate(
    date
) {

    return new Intl.DateTimeFormat(
        "nb-NO",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    ).format(
        date
    );

}


// ============================================================
// ISO WEEK NUMBER
// ============================================================

function getIsoWeekInfo(
    date
) {

    const temp =
        new Date(
            Date.UTC(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
            )
        );


    const dayNumber =
        temp.getUTCDay() ||
        7;


    temp.setUTCDate(
        temp.getUTCDate() +
        4 -
        dayNumber
    );


    const yearStart =
        new Date(
            Date.UTC(
                temp.getUTCFullYear(),
                0,
                1
            )
        );


    const week =
        Math.ceil(
            (
                (
                    temp -
                    yearStart
                ) /
                86400000 +
                1
            ) /
            7
        );


    return {
        week,
        year:
            temp.getUTCFullYear()
    };

}


// ============================================================
// WEEK DIFFERENCE
// ============================================================

function getWeekDifference(
    startFriday,
    targetFriday
) {

    const milliseconds =
        targetFriday.getTime() -
        startFriday.getTime();


    return Math.floor(
        milliseconds /
        (
            7 *
            24 *
            60 *
            60 *
            1000
        )
    );

}


// ============================================================
// SAME DATE
// ============================================================

function isSameCalendarDate(
    dateA,
    dateB
) {

    return (
        dateA.getFullYear() ===
        dateB.getFullYear() &&

        dateA.getMonth() ===
        dateB.getMonth() &&

        dateA.getDate() ===
        dateB.getDate()
    );

}


// ============================================================
// SESSION
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
// PROFILE
// ============================================================

async function loadProfile(
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
// ACCESS
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


    if (!profile) {

        await supabaseClient.auth.signOut();

        window.location.href =
            "index.html";

        return null;

    }


    if (!profile.is_active) {

        await supabaseClient.auth.signOut();

        window.location.href =
            "index.html";

        return null;

    }


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
// RESIDENT ASSOCIATION
// ============================================================

async function loadResidentAssociation(
    profileId
) {

    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "residents"
            )
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


    if (!data) {

        currentResident =
            null;


        showWaitingState();


        return {
            success: true,
            resident: null
        };

    }


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
// SHOW DASHBOARD
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


    if (floorName) {

        floorName.textContent =
            "Etasje: " +
            getFloorDisplayName(
                floor
            );

    }


    if (currentWeekFloor) {

        currentWeekFloor.textContent =
            getFloorDisplayName(
                floor
            );

    }


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
// RESET PLAN DISPLAY
// ============================================================

function resetCleaningPlanDisplay() {

    currentCleaningPlan =
        null;

    currentCleaningTasks =
        [];

    currentPlanMembers =
        [];

    currentWeekAssignments =
        [];

    currentCleaningCompletions =
        [];

    selectedResponsibleMember =
        null;


    if (noCleaningPlanState) {

        noCleaningPlanState.hidden =
            true;

    }


    if (cleaningPlanContent) {

        cleaningPlanContent.hidden =
            true;

    }


    if (cleaningTaskList) {

        cleaningTaskList.innerHTML =
            "";

    }


    if (weekPreviewList) {

        weekPreviewList.innerHTML =
            "";

    }


    resetSelectedPhotos();

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


    const {
        data: plan,
        error
    } =
        await supabaseClient
            .from(
                "cleaning_plans"
            )
            .select(`
                id,
                property_id,
                floor_id,
                name,
                start_date,
                is_active
            `)
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


    if (cleaningPlanSubtitle) {

        cleaningPlanSubtitle.textContent =
            (
                currentResident.properties?.name ||
                "Bolig"
            ) +
            " • " +
            getFloorDisplayName(
                currentResident.floors
            );

    }


    // ========================================================
    // LOAD EVERYTHING NEEDED FOR THE SCHEDULE
    // ========================================================

    await loadCleaningTasks();

    await loadPlanMembers();

    await loadWeekAssignments();


    currentWeekFriday =
        getCurrentCleaningFriday();


    selectedFriday =
        cloneDate(
            currentWeekFriday
        );


    await renderCleaningSchedule();

}


// ============================================================
// LOAD TASKS
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

}


// ============================================================
// LOAD ROTATION MEMBERS
// ============================================================

async function loadPlanMembers() {

    if (!currentCleaningPlan) {

        return;

    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "cleaning_plan_members"
            )
            .select(`
                id,
                plan_id,
                resident_id,
                rotation_order,

                residents (
                    id,
                    profile_id,
                    property_id,
                    floor_id,
                    is_active,

                    profiles (
                        id,
                        full_name
                    )
                )
            `)
            .eq(
                "plan_id",
                currentCleaningPlan.id
            )
            .order(
                "rotation_order",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(
            "LOAD CLEANING PLAN MEMBERS ERROR:",
            error
        );


        showPageError(
            "Kunne ikke hente rengjøringsrotasjonen."
        );


        return;

    }


    currentPlanMembers =
        (data || [])
            .filter(
                function (member) {

                    return (
                        member.residents &&
                        member.residents.is_active
                    );

                }
            );

}


// ============================================================
// LOAD WEEK ASSIGNMENTS
// ============================================================

async function loadWeekAssignments() {

    currentWeekAssignments = [];

    if (!currentCleaningPlan) {
        return;
    }


    const planStart =
        createLocalDateFromIso(
            currentCleaningPlan.start_date
        );


    const baseFriday =
        getCurrentCleaningFriday();


    const fridays = [];


    for (
        let offset = -2;
        offset <= 8;
        offset++
    ) {

        const friday =
            cloneDate(
                baseFriday
            );

        friday.setDate(
            friday.getDate() +
            (offset * 7)
        );


        if (
            friday >=
            planStart
        ) {

            fridays.push(
                friday
            );

        }

    }


    for (
        const friday
        of fridays
        ) {

        const weekStart =
            dateToIso(
                friday
            );


        const {
            error
        } =
            await supabaseClient
                .rpc(
                    "get_or_create_cleaning_week_assignment",
                    {
                        p_plan_id:
                        currentCleaningPlan.id,

                        p_week_start:
                        weekStart
                    }
                );


        if (error) {

            console.error(
                "CREATE WEEK ASSIGNMENT ERROR:",
                weekStart,
                error
            );

        }

    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "cleaning_week_assignments"
            )
            .select(`
                id,
                plan_id,
                week_start,
                resident_id,
                status,

                residents (
                    id,
                    profile_id,
                    property_id,
                    floor_id,
                    is_active,

                    profiles (
                        id,
                        full_name
                    )
                )
            `)
            .eq(
                "plan_id",
                currentCleaningPlan.id
            )
            .order(
                "week_start",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(
            "LOAD WEEK ASSIGNMENTS ERROR:",
            error
        );

        currentWeekAssignments =
            [];

        return;

    }


    currentWeekAssignments =
        (data || []).filter(
            function (
                assignment
            ) {

                return (
                    assignment.resident_id &&
                    assignment.residents &&
                    assignment.residents.is_active
                );

            }
        );

}
// ============================================================
// LOAD COMPLETIONS FOR SELECTED WEEK
// ============================================================

async function loadSelectedWeekCompletions() {

    currentCleaningCompletions =
        [];


    if (
        !currentCleaningPlan ||
        !selectedFriday
    ) {

        return;

    }


    const weekStart =
        dateToIso(
            selectedFriday
        );


    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "cleaning_completions"
            )
            .select(`
                id,
                plan_id,
                task_id,
                resident_id,
                week_start,
                completed_at
            `)
            .eq(
                "plan_id",
                currentCleaningPlan.id
            )
            .eq(
                "week_start",
                weekStart
            );


    if (error) {

        console.error(
            "LOAD CLEANING COMPLETIONS ERROR:",
            error
        );

        currentCleaningCompletions =
            [];

        return;

    }


    currentCleaningCompletions =
        data || [];

}


// ============================================================
// TASK COMPLETION CHECK
// ============================================================

function isTaskCompleted(
    taskId
) {

    return currentCleaningCompletions.some(
        function (completion) {

            return (
                completion.task_id ===
                taskId
            );

        }
    );

}


// ============================================================
// SAVE TASK COMPLETION
// ============================================================

async function saveTaskCompletion(
    taskId
) {

    if (
        !currentCleaningPlan ||
        !currentResident ||
        !selectedFriday
    ) {

        return {
            success: false
        };

    }


    const weekStart =
        dateToIso(
            selectedFriday
        );


    const {
        error
    } =
        await supabaseClient
            .from(
                "cleaning_completions"
            )
            .insert({
                plan_id:
                currentCleaningPlan.id,

                task_id:
                taskId,

                resident_id:
                currentResident.id,

                week_start:
                weekStart
            });


    if (error) {

        console.error(
            "SAVE CLEANING COMPLETION ERROR:",
            error
        );

        return {
            success: false,
            error
        };

    }


    await loadSelectedWeekCompletions();


    return {
        success: true
    };

}


// ============================================================
// DELETE TASK COMPLETION
// ============================================================

async function deleteTaskCompletion(
    taskId
) {

    if (
        !currentCleaningPlan ||
        !currentResident ||
        !selectedFriday
    ) {

        return {
            success: false
        };

    }


    const weekStart =
        dateToIso(
            selectedFriday
        );


    const {
        error
    } =
        await supabaseClient
            .from(
                "cleaning_completions"
            )
            .delete()
            .eq(
                "plan_id",
                currentCleaningPlan.id
            )
            .eq(
                "task_id",
                taskId
            )
            .eq(
                "resident_id",
                currentResident.id
            )
            .eq(
                "week_start",
                weekStart
            );


    if (error) {

        console.error(
            "DELETE CLEANING COMPLETION ERROR:",
            error
        );

        return {
            success: false,
            error
        };

    }


    await loadSelectedWeekCompletions();


    return {
        success: true
    };

}


// ============================================================
// GET STORED ASSIGNMENT FOR FRIDAY
// ============================================================

function getStoredAssignmentForFriday(
    friday
) {

    if (
        !friday ||
        currentWeekAssignments.length ===
        0
    ) {

        return null;

    }


    const fridayIso =
        dateToIso(
            friday
        );


    return (
        currentWeekAssignments.find(
            function (assignment) {

                return (
                    assignment.week_start ===
                    fridayIso
                );

            }
        ) ||
        null
    );

}


// ============================================================
// GET FALLBACK ROTATION MEMBER
// ============================================================

function getRotationMemberForFriday(
    friday
) {

    if (
        !currentCleaningPlan ||
        currentPlanMembers.length ===
        0
    ) {

        return null;

    }


    const planStart =
        createLocalDateFromIso(
            currentCleaningPlan.start_date
        );


    const weekDifference =
        getWeekDifference(
            planStart,
            friday
        );


    const count =
        currentPlanMembers.length;


    const normalizedIndex =
        (
            (
                weekDifference %
                count
            ) +
            count
        ) %
        count;


    return (
        currentPlanMembers[
            normalizedIndex
            ] ||
        null
    );

}


// ============================================================
// RESPONSIBLE MEMBER
// ============================================================

function getResponsibleMemberForFriday(
    friday
) {

    /*
     * PRIORITET 1:
     *
     * Bruk den faktiske lagrede uke-tildelingen.
     */

    const assignment =
        getStoredAssignmentForFriday(
            friday
        );


    if (assignment) {

        /*
         * Vi returnerer samme grunnstruktur som resten av
         * Resident-koden allerede forventer:
         *
         * {
         *     resident_id,
         *     residents: {
         *         profiles: {
         *             full_name
         *         }
         *     }
         * }
         *
         * Dermed trenger vi ikke bygge om resten av UI-et.
         */

        return {

            id:
            assignment.id,

            plan_id:
            assignment.plan_id,

            resident_id:
            assignment.resident_id,

            residents:
            assignment.residents,

            assignment:
            assignment,

            assignment_status:
            assignment.status,

            source:
                "assignment"

        };

    }


    /*
     * PRIORITET 2:
     *
     * Ingen lagret assignment finnes.
     *
     * Da bruker vi den eksisterende matematiske rotasjonen
     * slik at planen fortsatt kan vises.
     */

    const rotationMember =
        getRotationMemberForFriday(
            friday
        );


    if (!rotationMember) {

        return null;

    }


    return {

        ...rotationMember,

        assignment:
            null,

        assignment_status:
            null,

        source:
            "rotation"

    };

}


// ============================================================
// MEMBER NAME
// ============================================================

function getMemberName(
    member
) {

    return (
        member?.
            residents?.
            profiles?.
            full_name ||
        "Ikke tildelt"
    );

}


// ============================================================
// CURRENT USER RESPONSIBLE
// ============================================================

function isCurrentResidentResponsible() {

    if (
        !selectedResponsibleMember ||
        !currentResident
    ) {

        return false;

    }


    return (
        selectedResponsibleMember.resident_id ===
        currentResident.id
    );

}


// ============================================================
// SELECTED CURRENT WEEK
// ============================================================

function isSelectedCurrentWeek() {

    if (
        !selectedFriday ||
        !currentWeekFriday
    ) {

        return false;

    }


    return isSameCalendarDate(
        selectedFriday,
        currentWeekFriday
    );

}


// ============================================================
// COMPLETION WINDOW
// ============================================================

function isCompletionWindowOpen() {

    if (!isSelectedCurrentWeek()) {

        return false;

    }


    const now =
        new Date();


    const day =
        now.getDay();


    return (
        day ===
        4 ||
        day ===
        5
    );

}


// ============================================================
// CAN COMPLETE
// ============================================================

function canCurrentUserComplete() {

    return (
        isCurrentResidentResponsible() &&
        isCompletionWindowOpen()
    );

}


// ============================================================
// WEEK STATUS
// ============================================================

function getWeekStatusText(
    friday
) {

    if (!currentWeekFriday) {

        return "Planlagt";

    }


    if (
        friday.getTime() <
        currentWeekFriday.getTime()
    ) {

        return "Tidligere uke";

    }


    if (
        friday.getTime() >
        currentWeekFriday.getTime()
    ) {

        return "Kommende";

    }


    const today =
        new Date();


    if (
        today.getDay() <=
        3
    ) {

        return "Ikke tilgjengelig ennå";

    }


    if (
        today.getDay() ===
        4 ||
        today.getDay() ===
        5
    ) {

        return "Åpen";

    }


    return "Frist utløpt";

}


// ============================================================
// RENDER SELECTED WEEK
// ============================================================

async function renderCleaningSchedule() {

    if (
        !currentCleaningPlan ||
        !selectedFriday
    ) {

        return;

    }


    /*
     * Denne funksjonen bruker nå:
     *
     * cleaning_week_assignments først
     *             ↓
     * cleaning_plan_members som fallback
     */

    selectedResponsibleMember =
        getResponsibleMemberForFriday(
            selectedFriday
        );


    await loadSelectedWeekCompletions();


    renderCurrentWeekCard();

    renderSelectedWeek();

    renderWeekPreview();

    renderCleaningTasks();

    updateCompletionControls();

    updateConfirmButtonState();

}


// ============================================================
// CURRENT WEEK CARD
// ============================================================

function renderCurrentWeekCard() {

    if (!currentWeekFriday) {

        return;

    }


    const member =
        getResponsibleMemberForFriday(
            currentWeekFriday
        );


    const weekInfo =
        getIsoWeekInfo(
            currentWeekFriday
        );


    if (currentWeekHeading) {

        currentWeekHeading.textContent =
            "Rengjøring • Uke " +
            weekInfo.week;

    }


    if (currentWeekDate) {

        currentWeekDate.textContent =
            formatDisplayDate(
                currentWeekFriday
            );

    }


    if (currentWeekResponsible) {

        currentWeekResponsible.textContent =
            getMemberName(
                member
            );

    }


    if (currentWeekFloor) {

        currentWeekFloor.textContent =
            getFloorDisplayName(
                currentResident?.floors
            );

    }


    if (currentWeekStatus) {

        currentWeekStatus.textContent =
            getWeekStatusText(
                currentWeekFriday
            );

    }

}


// ============================================================
// SELECTED WEEK INFORMATION
// ============================================================

function renderSelectedWeek() {

    const weekInfo =
        getIsoWeekInfo(
            selectedFriday
        );


    if (selectedWeekNumber) {

        selectedWeekNumber.textContent =
            "Uke " +
            weekInfo.week;

    }


    if (selectedWeekYear) {

        selectedWeekYear.textContent =
            weekInfo.year;

    }


    if (selectedWeekDate) {

        selectedWeekDate.textContent =
            formatDisplayDate(
                selectedFriday
            );

    }


    if (selectedWeekResponsible) {

        selectedWeekResponsible.textContent =
            getMemberName(
                selectedResponsibleMember
            );

    }


    if (selectedWeekStatus) {

        selectedWeekStatus.textContent =
            getWeekStatusText(
                selectedFriday
            );

    }

    if (signedByName) {

        signedByName.textContent =
            getMemberName(
                selectedResponsibleMember
            );

    }

    if (confirmWeekNumber) {

        confirmWeekNumber.textContent =
            "Uke " +
            weekInfo.week;

    }

}


// ============================================================
// WEEK PREVIEW
// ============================================================

function renderWeekPreview() {

    if (!weekPreviewList) {

        return;

    }


    weekPreviewList.innerHTML =
        "";


    const offsets =
        [
            -2,
            -1,
            0,
            1,
            2
        ];


    offsets.forEach(
        function (offset) {

            const friday =
                addDays(
                    selectedFriday,
                    offset * 7
                );


            const weekInfo =
                getIsoWeekInfo(
                    friday
                );


            const member =
                getResponsibleMemberForFriday(
                    friday
                );


            const item =
                document.createElement(
                    "button"
                );


            item.type =
                "button";


            item.className =
                "resident-week-preview-item";


            if (
                offset ===
                0
            ) {

                item.classList.add(
                    "active"
                );

            }


            const week =
                document.createElement(
                    "strong"
                );


            week.textContent =
                "Uke " +
                weekInfo.week;


            const responsible =
                document.createElement(
                    "span"
                );


            responsible.textContent =
                getMemberName(
                    member
                );


            const date =
                document.createElement(
                    "small"
                );


            date.textContent =
                formatShortDate(
                    friday
                );


            item.appendChild(
                week
            );


            item.appendChild(
                responsible
            );


            item.appendChild(
                date
            );


            item.addEventListener(
                "click",
                async function () {

                    selectedFriday =
                        cloneDate(
                            friday
                        );


                    resetSelectedPhotos();


                    await renderCleaningSchedule();

                }
            );


            weekPreviewList.appendChild(
                item
            );

        }
    );

}

// ============================================================


// RENDER TASKS
// ============================================================

function renderCleaningTasks() {

    if (cleaningTaskList) {

        cleaningTaskList.innerHTML =
            "";

    }


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

            cleaningTaskCount.textContent =
                "0 oppgaver";

        }


        return;

    }


    if (noCleaningTasksState) {

        noCleaningTasksState.hidden =
            true;

    }


    if (cleaningTasksWrapper) {

        cleaningTasksWrapper.hidden =
            false;

    }


    const canComplete =
        canCurrentUserComplete();


    currentCleaningTasks.forEach(
        function (
            item,
            index
        ) {

            const task =
                item.cleaning_tasks;


            const taskRow =
                document.createElement(
                    "label"
                );


            taskRow.className =
                "resident-cleaning-task-row";


            if (!canComplete) {

                taskRow.classList.add(
                    "locked"
                );

            }


            const checkbox =
                document.createElement(
                    "input"
                );


            checkbox.type =
                "checkbox";


            checkbox.className =
                "resident-cleaning-checkbox";


            checkbox.dataset.taskId =
                task.id;


            checkbox.checked =
                isTaskCompleted(
                    task.id
                );


            checkbox.disabled =
                !canComplete;


            const content =
                document.createElement(
                    "div"
                );


            content.className =
                "resident-cleaning-task-content";


            const number =
                document.createElement(
                    "span"
                );


            number.className =
                "resident-cleaning-task-number";


            number.textContent =
                String(
                    index + 1
                );


            const textWrapper =
                document.createElement(
                    "div"
                );


            const title =
                document.createElement(
                    "div"
                );


            title.className =
                "resident-cleaning-task-title";


            title.textContent =
                task.name;


            textWrapper.appendChild(
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


                textWrapper.appendChild(
                    description
                );

            }


            content.appendChild(
                number
            );


            content.appendChild(
                textWrapper
            );


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


    if (cleaningTaskCount) {

        cleaningTaskCount.textContent =
            currentCleaningTasks.length +
            (
                currentCleaningTasks.length ===
                1
                    ? " oppgave"
                    : " oppgaver"
            );

    }

}


// ============================================================
// UPDATE CONTROLS
// ============================================================

function updateCompletionControls() {

    const responsible =
        isCurrentResidentResponsible();

    const currentWeek =
        isSelectedCurrentWeek();

    const windowOpen =
        isCompletionWindowOpen();

    const canComplete =
        canCurrentUserComplete();


    if (cameraButton) {

        cameraButton.disabled =
            !canComplete;

    }


    if (!responsible) {

        if (taskPermissionMessage) {

            taskPermissionMessage.textContent =
                "Du kan se oppgavene, men bare ukens ansvarlige kan fullføre dem.";

        }


        if (cleaningPermissionText) {

            cleaningPermissionText.textContent =
                "Kun " +
                getMemberName(
                    selectedResponsibleMember
                ) +
                " kan fullføre denne uken.";

        }


        if (responsibleOnlyMessage) {

            responsibleOnlyMessage.textContent =
                "🔒 Kun ukens ansvarlige kan bekrefte rengjøringen.";

        }


        return;

    }


    if (!currentWeek) {

        if (taskPermissionMessage) {

            taskPermissionMessage.textContent =
                "Dette er ikke den aktive rengjøringsuken.";

        }


        if (cleaningPermissionText) {

            cleaningPermissionText.textContent =
                "Oppgaver kan bare fullføres i den aktuelle uken.";

        }


        if (responsibleOnlyMessage) {

            responsibleOnlyMessage.textContent =
                "🔒 Velg den aktuelle uken for å utføre rengjøringen.";

        }


        return;

    }


    if (!windowOpen) {

        const today =
            new Date();


        if (
            today.getDay() <=
            3
        ) {

            if (taskPermissionMessage) {

                taskPermissionMessage.textContent =
                    "Rengjøringen blir tilgjengelig torsdag.";

            }


            if (cleaningPermissionText) {

                cleaningPermissionText.textContent =
                    "Ikke tilgjengelig ennå. Rengjøring kan registreres torsdag eller fredag.";

            }


            if (responsibleOnlyMessage) {

                responsibleOnlyMessage.textContent =
                    "🔒 Bekreftelse åpnes torsdag.";

            }

        }
        else {

            if (taskPermissionMessage) {

                taskPermissionMessage.textContent =
                    "Fristen for denne uken er utløpt.";

            }


            if (cleaningPermissionText) {

                cleaningPermissionText.textContent =
                    "Rengjøringen kan ikke lenger registreres for denne uken.";

            }


            if (responsibleOnlyMessage) {

                responsibleOnlyMessage.textContent =
                    "🔒 Fristen er utløpt.";

            }

        }


        return;

    }


    if (taskPermissionMessage) {

        taskPermissionMessage.textContent =
            "Du er ansvarlig denne uken. Huk av oppgavene etter hvert som de utføres.";

    }


    if (cleaningPermissionText) {

        cleaningPermissionText.textContent =
            "Du er ansvarlig for denne uken.";

    }


    if (responsibleOnlyMessage) {

        responsibleOnlyMessage.textContent =
            "Fullfør alle oppgaver og ta minst ett nytt bilde før du signerer.";

    }

}


// ============================================================
// PREVIOUS WEEK
// ============================================================

if (previousWeekButton) {

    previousWeekButton.addEventListener(
        "click",
        async function () {

            if (!selectedFriday) {

                return;

            }


            selectedFriday =
                addDays(
                    selectedFriday,
                    -7
                );


            resetSelectedPhotos();


            await renderCleaningSchedule();

        }
    );

}


// ============================================================
// NEXT WEEK
// ============================================================

if (nextWeekButton) {

    nextWeekButton.addEventListener(
        "click",
        async function () {

            if (!selectedFriday) {

                return;

            }


            selectedFriday =
                addDays(
                    selectedFriday,
                    7
                );


            resetSelectedPhotos();


            await renderCleaningSchedule();

        }
    );

}


// ============================================================
// CAMERA BUTTON
// ============================================================

if (cameraButton) {

    cameraButton.addEventListener(
        "click",
        function () {

            if (
                cameraButton.disabled
            ) {

                return;

            }


            if (
                selectedPhotos.length >=
                MAX_PHOTOS
            ) {

                window.alert(
                    "Du kan legge til maksimalt 6 bilder."
                );


                return;

            }


            if (cameraInput) {

                cameraInput.click();

            }

        }
    );

}


// ============================================================
// CAMERA FILE CHANGE
// ============================================================

if (cameraInput) {

    cameraInput.addEventListener(
        "change",
        function () {

            addCameraPhoto(
                cameraInput.files
            );


            cameraInput.value =
                "";

        }
    );

}


// ============================================================
// ADD CAMERA PHOTO
// ============================================================

function addCameraPhoto(
    fileList
) {

    if (
        !fileList ||
        fileList.length ===
        0
    ) {

        return;

    }


    const file =
        fileList[0];


    if (
        !file.type.startsWith(
            "image/"
        )
    ) {

        return;

    }


    if (
        selectedPhotos.length >=
        MAX_PHOTOS
    ) {

        window.alert(
            "Du kan legge til maksimalt 6 bilder."
        );


        return;

    }


    selectedPhotos.push(
        file
    );


    renderPhotoPreviews();

}


// ============================================================
// RESET PHOTOS
// ============================================================

function resetSelectedPhotos() {

    selectedPhotos =
        [];


    renderPhotoPreviews();

}


// ============================================================
// RENDER PHOTO PREVIEWS
// ============================================================

function renderPhotoPreviews() {

    if (photoPreviewGrid) {

        photoPreviewGrid.innerHTML =
            "";

    }


    if (photoCount) {

        photoCount.textContent =
            "Bilder (" +
            selectedPhotos.length +
            "/" +
            MAX_PHOTOS +
            ")";

    }


    selectedPhotos.forEach(
        function (
            file,
            index
        ) {

            const wrapper =
                document.createElement(
                    "div"
                );


            wrapper.className =
                "resident-photo-preview";


            const image =
                document.createElement(
                    "img"
                );


            const objectUrl =
                URL.createObjectURL(
                    file
                );


            image.src =
                objectUrl;


            image.alt =
                "Dokumentasjonsbilde";


            image.addEventListener(
                "load",
                function () {

                    URL.revokeObjectURL(
                        objectUrl
                    );

                }
            );


            const removeButton =
                document.createElement(
                    "button"
                );


            removeButton.type =
                "button";


            removeButton.className =
                "resident-photo-remove";


            removeButton.textContent =
                "×";


            removeButton.setAttribute(
                "aria-label",
                "Fjern bilde"
            );


            removeButton.addEventListener(
                "click",
                function () {

                    selectedPhotos.splice(
                        index,
                        1
                    );


                    renderPhotoPreviews();

                }
            );


            wrapper.appendChild(
                image
            );


            wrapper.appendChild(
                removeButton
            );


            photoPreviewGrid.appendChild(
                wrapper
            );

        }
    );


    if (cameraButton) {

        cameraButton.textContent =
            selectedPhotos.length >=
            MAX_PHOTOS
                ? "✓ Maks antall bilder tatt"
                : "📷 Ta bilde";


        cameraButton.disabled =
            (
                !canCurrentUserComplete() ||
                selectedPhotos.length >=
                MAX_PHOTOS
            );

    }


    updateConfirmButtonState();

}


// ============================================================
// TASK CHECKBOX CHANGE
// ============================================================

if (cleaningTaskList) {

    cleaningTaskList.addEventListener(
        "change",
        async function (event) {

            const checkbox =
                event.target;


            if (
                !checkbox.matches(
                    ".resident-cleaning-checkbox"
                )
            ) {

                return;

            }


            if (
                !canCurrentUserComplete()
            ) {

                checkbox.checked =
                    !checkbox.checked;

                return;

            }


            const taskId =
                checkbox.dataset.taskId;


            if (!taskId) {

                checkbox.checked =
                    !checkbox.checked;

                return;

            }


            const wantedCheckedState =
                checkbox.checked;


            checkbox.disabled =
                true;


            let result;


            if (wantedCheckedState) {

                result =
                    await saveTaskCompletion(
                        taskId
                    );

            }
            else {

                result =
                    await deleteTaskCompletion(
                        taskId
                    );

            }


            if (!result.success) {

                checkbox.checked =
                    !wantedCheckedState;

                window.alert(
                    wantedCheckedState
                        ? "Kunne ikke lagre oppgaven som fullført."
                        : "Kunne ikke fjerne fullføringen av oppgaven."
                );

            }
            else {

                checkbox.checked =
                    isTaskCompleted(
                        taskId
                    );

            }


            checkbox.disabled =
                !canCurrentUserComplete();


            updateConfirmButtonState();

        }
    );

}


// ============================================================
// CONFIRM BUTTON STATE
// ============================================================

function updateConfirmButtonState() {

    if (!confirmCleaningButton) {

        return;

    }


    if (!canCurrentUserComplete()) {

        confirmCleaningButton.disabled =
            true;


        return;

    }


    const checkboxes =
        cleaningTaskList
            ? Array.from(
                cleaningTaskList.querySelectorAll(
                    ".resident-cleaning-checkbox"
                )
            )
            : [];


    const allTasksChecked =
        checkboxes.length >
        0 &&
        checkboxes.every(
            function (checkbox) {

                return checkbox.checked;

            }
        );


    const hasPhoto =
        selectedPhotos.length >
        0;


    confirmCleaningButton.disabled =
        !(
            allTasksChecked &&
            hasPhoto
        );

}


// ============================================================
// CONFIRM
// ============================================================

if (confirmCleaningButton) {

    confirmCleaningButton.addEventListener(
        "click",
        function () {

            if (
                confirmCleaningButton.disabled
            ) {

                return;

            }


            /*
             * Supabase Storage and secure final signing
             * will be connected in the next database step.
             *
             * Nothing is marked completed in localStorage
             * or only in the browser.
             */

            window.alert(
                "Alle oppgaver er fullført og dokumentasjonen er klar. " +
                "Neste steg er å lagre bildene og signeringen sikkert i Supabase."
            );

        }
    );

}


// ============================================================
// INITIALIZE
// ============================================================

async function initResidentPage() {

    hideContentSections();


    if (loadingSection) {

        loadingSection.hidden =
            false;

    }


    const result =
        await checkResidentAccess();


    if (!result) {

        return;

    }


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


    if (!associationResult.resident) {

        return;

    }


    await loadCleaningPlan();

}


// ============================================================
// START
// ============================================================

initResidentPage();
