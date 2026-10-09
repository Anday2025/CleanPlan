
"use strict";

// ============================================================
// CLEANPLAN - ADMIN CLEANING SETTINGS
// ============================================================

const settingsForm =
    document.getElementById("cleaningSettingsForm");

const settingsPropertySelect =
    document.getElementById("settingsPropertySelect");

const settingsFloorSelect =
    document.getElementById("settingsFloorSelect");

const settingsCleaningDay =
    document.getElementById("settingsCleaningDay");

const settingsDeadlineTime =
    document.getElementById("settingsDeadlineTime");

const settingsAllowEarly =
    document.getElementById("settingsAllowEarly");

const saveSettingsButton =
    document.getElementById("saveCleaningSettingsButton");

const settingsMessage =
    document.getElementById("cleaningSettingsMessage");

const settingsDays = [
    ["Søndag", "Sunday"],
    ["Mandag", "Monday"],
    ["Tirsdag", "Tuesday"],
    ["Onsdag", "Wednesday"],
    ["Torsdag", "Thursday"],
    ["Fredag", "Friday"],
    ["Lørdag", "Saturday"]
];

let availableSettingsFloors = [];
let settingsLoadId = 0;
let settingsAuthorized = false;
let settingsBusy = false;


// ============================================================
// LANGUAGE
// ============================================================

function settingsEnglish() {
    return window.CleanPlanI18n?.getLanguage?.() === "en";
}

function settingsText(no, en) {
    return settingsEnglish() ? en : no;
}

function showSettingsMessage(no, en, status = "") {
    settingsMessage.textContent = settingsText(no, en);
    settingsMessage.dataset.status = status;
}

function settingsOption(select, value, label) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    select.appendChild(option);
}

function updateSettingsLanguage() {

    const labels = [
        ["settingsBack", "← Tilbake til oversikt", "← Back to dashboard"],
        ["cleaningSettingsTitle", "Rengjøringsinnstillinger", "Cleaning settings"],
        ["cleaningSettingsDescription",
            "Velg bolig og etasje for å administrere rengjøringsdag og tidsfrist.",
            "Select a property and floor to manage cleaning days and deadlines."],
        ["settingsProperty", "Velg bolig", "Select property"],
        ["settingsFloor", "Velg etasje", "Select floor"],
        ["settingsCleaningDay", "Rengjøringsdag", "Cleaning day"],
        ["settingsDeadline", "Frist", "Deadline"],
        ["settingsAllowEarly",
            "Tillat rengjøring én dag tidligere",
            "Allow cleaning one day earlier"],
        ["settingsSave", "Lagre innstillinger", "Save settings"]
    ];

    for (const [key, no, en] of labels) {
        document.querySelectorAll(`[data-i18n="${key}"]`)
            .forEach(element => {
                element.textContent = settingsText(no, en);
            });
    }

    for (const option of settingsCleaningDay.options) {
        const day = Number(option.value);
        option.textContent =
            settingsDays[day][settingsEnglish() ? 1 : 0];
    }

    const selectedFloor = settingsFloorSelect.value;

    const allOption =
        settingsFloorSelect.querySelector('option[value="all"]');

    if (allOption) {
        allOption.textContent =
            settingsText("Alle etasjer", "All floors");
    }

    if (settingsFloorSelect.options.length > 0) {
        const placeholder =
            settingsFloorSelect.querySelector('option[value=""]');

        if (placeholder) {
            placeholder.textContent =
                settingsPropertySelect.value
                    ? settingsText("Velg etasje", "Select floor")
                    : settingsText("Velg bolig først", "Select property first");
        }
    }

    for (const floor of availableSettingsFloors) {
        const option =
            [...settingsFloorSelect.options]
                .find(item => item.value === floor.id);

        if (option) {
            option.textContent = floor.name ||
                settingsText(
                    `Etasje ${floor.floor_number}`,
                    `Floor ${floor.floor_number}`
                );
        }
    }

    settingsFloorSelect.value = selectedFloor;
}

// ============================================================
// SETTINGS - LANGUAGE CHANGE
// ============================================================

function refreshSettingsLanguage() {

    updateSettingsLanguage();

    const propertyPlaceholder =
        settingsPropertySelect.querySelector(
            'option[value=""]'
        );

    if (propertyPlaceholder) {
        propertyPlaceholder.textContent =
            settingsText(
                "Velg bolig",
                "Select property"
            );
    }

    const floorPlaceholder =
        settingsFloorSelect.querySelector(
            'option[value=""]'
        );

    if (floorPlaceholder) {
        floorPlaceholder.textContent =
            settingsPropertySelect.value
                ? settingsText(
                    "Velg etasje",
                    "Select floor"
                )
                : settingsText(
                    "Velg bolig først",
                    "Select property first"
                );
    }

    // Update the current status message.
    if (!settingsPropertySelect.value) {

        showSettingsMessage(
            "Velg bolig og etasje.",
            "Select a property and floor."
        );

    }

}

window.addEventListener(
    "languageChanged",
    refreshSettingsLanguage
);

// ============================================================
// FIX SETTINGS TRANSLATIONS
// ============================================================

function applySettingsTranslations() {
    refreshSettingsLanguage();
}

document.addEventListener(
    "DOMContentLoaded",
    applySettingsTranslations
);

setTimeout(
    applySettingsTranslations,
    100
);


// ============================================================
// FORM STATE
// ============================================================

function updateSettingsSaveButton() {
    saveSettingsButton.disabled =
        !settingsAuthorized ||
        settingsBusy ||
        !settingsPropertySelect.value ||
        !settingsFloorSelect.value ||
        availableSettingsFloors.length === 0;
}

function resetSettingsValues() {
    settingsCleaningDay.value = "5";
    settingsDeadlineTime.value = "18:00";
    settingsAllowEarly.checked = false;
}


// ============================================================
// LOAD PROPERTIES
// ============================================================

async function loadSettingsProperties() {

    const { data, error } = await supabaseClient
        .from("properties")
        .select("id, name, address")
        .order("name");

    if (error) throw error;

    settingsPropertySelect.replaceChildren();

    settingsOption(
        settingsPropertySelect,
        "",
        settingsText("Velg bolig", "Select property")
    );

    for (const property of data || []) {
        settingsOption(
            settingsPropertySelect,
            property.id,
            property.name || property.address || "Bolig"
        );
    }

    settingsPropertySelect.disabled = !(data || []).length;

    showSettingsMessage(
        "Velg bolig og etasje.",
        "Select a property and floor."
    );
}


// ============================================================
// LOAD FLOORS
// ============================================================

async function loadSettingsFloors() {

    const requestId = ++settingsLoadId;
    const propertyId = settingsPropertySelect.value;

    settingsFloorSelect.disabled = true;
    settingsFloorSelect.replaceChildren();
    availableSettingsFloors = [];
    resetSettingsValues();
    updateSettingsSaveButton();

    settingsOption(
        settingsFloorSelect,
        "",
        settingsText("Velg etasje", "Select floor")
    );

    if (!propertyId) return;

    const { data, error } = await supabaseClient
        .from("floors")
        .select("id, name, floor_number")
        .eq("property_id", propertyId)
        .order("floor_number");

    if (requestId !== settingsLoadId) return;

    if (error) {
        showSettingsMessage(
            "Kunne ikke hente etasjer: " + error.message,
            "Could not load floors: " + error.message,
            "error"
        );
        return;
    }

    availableSettingsFloors = data || [];

    if (availableSettingsFloors.length === 0) {
        showSettingsMessage(
            "Ingen etasjer er tilgjengelige.",
            "No floors are available."
        );
        return;
    }

    settingsOption(
        settingsFloorSelect,
        "all",
        settingsText("Alle etasjer", "All floors")
    );

    for (const floor of availableSettingsFloors) {
        settingsOption(
            settingsFloorSelect,
            floor.id,
            floor.name ||
            settingsText(
                `Etasje ${floor.floor_number}`,
                `Floor ${floor.floor_number}`
            )
        );
    }

    settingsFloorSelect.disabled = false;

    showSettingsMessage(
        "Velg etasje for å se eller endre innstillinger.",
        "Select a floor to view or change settings."
    );

    updateSettingsSaveButton();
}


// ============================================================
// LOAD EXISTING SETTINGS
// ============================================================

async function loadSelectedSettings() {

    const requestId = ++settingsLoadId;
    const floorId = settingsFloorSelect.value;

    resetSettingsValues();
    updateSettingsSaveButton();

    if (!floorId) return;

    if (floorId === "all") {
        showSettingsMessage(
            "Endringene vil gjelde alle etasjer i valgt bolig.",
            "Changes will apply to all floors in the selected property."
        );
        return;
    }

    const { data, error } = await supabaseClient
        .from("cleaning_settings")
        .select("cleaning_day, deadline_time, allow_early_cleaning")
        .eq("floor_id", floorId)
        .maybeSingle();

    if (requestId !== settingsLoadId) return;

    if (error) {
        showSettingsMessage(
            "Kunne ikke hente innstillinger: " + error.message,
            "Could not load settings: " + error.message,
            "error"
        );
        return;
    }

    if (data) {
        settingsCleaningDay.value = String(data.cleaning_day);
        settingsDeadlineTime.value =
            data.deadline_time.slice(0, 5);
        settingsAllowEarly.checked =
            data.allow_early_cleaning;
    }

    showSettingsMessage(
        data
            ? "Eksisterende innstillinger er lastet."
            : "Ingen egne innstillinger er lagret for denne etasjen.",
        data
            ? "Existing settings loaded."
            : "No custom settings saved for this floor."
    );
}


// ============================================================
// SAVE SETTINGS
// ============================================================

settingsForm.addEventListener("submit", async event => {

    event.preventDefault();

    if (
        !settingsAuthorized ||
        settingsBusy ||
        !settingsPropertySelect.value ||
        !settingsFloorSelect.value
    ) {
        return;
    }

    const propertyId = settingsPropertySelect.value;
    const selectedFloor = settingsFloorSelect.value;

    const floorsToSave =
        selectedFloor === "all"
            ? availableSettingsFloors
            : availableSettingsFloors.filter(
                floor => floor.id === selectedFloor
            );

    if (floorsToSave.length === 0) return;

    const cleaningDay = Number(settingsCleaningDay.value);
    const deadlineTime = settingsDeadlineTime.value;

    if (
        !Number.isInteger(cleaningDay) ||
        cleaningDay < 0 ||
        cleaningDay > 6 ||
        !/^\d{2}:\d{2}$/.test(deadlineTime)
    ) {
        showSettingsMessage(
            "Kontroller rengjøringsdag og frist.",
            "Check the cleaning day and deadline.",
            "error"
        );
        return;
    }

    settingsBusy = true;
    updateSettingsSaveButton();

    try {

        // Recheck the property relationship before saving.
        const floorIds = floorsToSave.map(floor => floor.id);

        const { data: currentFloors, error: floorError } =
            await supabaseClient
                .from("floors")
                .select("id")
                .eq("property_id", propertyId)
                .in("id", floorIds);

        if (floorError) throw floorError;

        if ((currentFloors || []).length !== floorIds.length) {
            throw new Error(
                settingsText(
                    "Tilgangen til en eller flere etasjer er endret.",
                    "Access to one or more floors has changed."
                )
            );
        }

        const rows = floorIds.map(floorId => ({
            floor_id: floorId,
            cleaning_day: cleaningDay,
            deadline_time: deadlineTime,
            allow_early_cleaning: settingsAllowEarly.checked,
            updated_at: new Date().toISOString()
        }));

        const { error } = await supabaseClient
            .from("cleaning_settings")
            .upsert(rows, { onConflict: "floor_id" });

        if (error) throw error;

        showSettingsMessage(
            `Innstillinger lagret for ${rows.length} etasje(r).`,
            `Settings saved for ${rows.length} floor(s).`,
            "success"
        );

    } catch (error) {

        showSettingsMessage(
            "Kunne ikke lagre: " + error.message,
            "Could not save: " + error.message,
            "error"
        );

    } finally {
        settingsBusy = false;
        updateSettingsSaveButton();
    }
});


// ============================================================
// EVENTS
// ============================================================

settingsPropertySelect.addEventListener(
    "change",
    loadSettingsFloors
);

settingsFloorSelect.addEventListener(
    "change",
    loadSelectedSettings
);

document.getElementById("sidebarLogoutButton")
    ?.addEventListener("click", async () => {
        await supabaseClient.auth.signOut();
        window.location.replace("index.html");
    });

document.getElementById("mobileSidebarButton")
    ?.addEventListener("click", () => {
        document.querySelector(".admin-sidebar")
            ?.classList.toggle("open");
    });


// ============================================================
// AUTHORIZATION AND INITIALIZATION
// ============================================================

async function initializeCleaningSettings() {

    try {

        const { data: authData, error: authError } =
            await supabaseClient.auth.getUser();

        if (authError || !authData?.user) {
            window.location.replace("index.html");
            return;
        }

        const { data: profile, error: profileError } =
            await supabaseClient
                .from("profiles")
                .select("full_name, email, role, is_active")
                .eq("id", authData.user.id)
                .single();

        if (
            profileError ||
            !profile ||
            !profile.is_active ||
            !["admin", "superadmin"].includes(profile.role)
        ) {
            showSettingsMessage(
                "Du har ikke tilgang til denne siden.",
                "You do not have access to this page.",
                "error"
            );
            return;
        }

        const name = profile.full_name || "Administrator";

        document.getElementById("adminName").textContent = name;

        document.getElementById("adminRole").textContent =
            profile.role === "superadmin"
                ? "Superadmin"
                : "Admin";

        document.getElementById("adminInitial").textContent =
            name.trim().charAt(0).toUpperCase();

        settingsAuthorized = true;

        await loadSettingsProperties();

        updateSettingsSaveButton();

    } catch (error) {

        showSettingsMessage(
            "Kunne ikke laste innstillinger: " + error.message,
            "Could not load settings: " + error.message,
            "error"
        );

    }
}

initializeCleaningSettings();
