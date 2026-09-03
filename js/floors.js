// ============================================================
// CLEANPLAN
// FLOORS
// ============================================================


// ============================================================
// ELEMENTS
// ============================================================

const propertyInfo =
    document.getElementById(
        "propertyInfo"
    );

const floorList =
    document.getElementById(
        "floorList"
    );

const floorForm =
    document.getElementById(
        "floorForm"
    );

const floorNumberInput =
    document.getElementById(
        "floorNumber"
    );

const floorNameInput =
    document.getElementById(
        "floorName"
    );

const saveFloorButton =
    document.getElementById(
        "saveFloorButton"
    );

const floorMessage =
    document.getElementById(
        "floorMessage"
    );

const logoutButton =
    document.getElementById(
        "logoutButton"
    );

const backButton =
    document.getElementById(
        "backButton"
    );


// ============================================================
// PROPERTY ID
// ============================================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const propertyId =
    urlParams.get(
        "property_id"
    );


// ============================================================
// STATE
// ============================================================

let editingFloorId =
    null;

let currentProperty =
    null;

let currentFloors =
    [];


// ============================================================
// I18N
// ============================================================

function t(
    key,
    params = {},
    fallback = ""
) {

    if (
        window.CleanPlanI18n &&
        typeof window.CleanPlanI18n.t ===
        "function"
    ) {

        const translated =
            window.CleanPlanI18n.t(
                key,
                params
            );


        if (
            translated &&
            translated !== key
        ) {

            return translated;

        }

    }


    let text =
        fallback || key;


    Object.entries(
        params
    ).forEach(
        function (
            [paramKey, value]
        ) {

            text =
                text.replaceAll(
                    "{" +
                    paramKey +
                    "}",
                    String(value)
                );

        }
    );


    return text;

}


// ============================================================
// MESSAGE
// ============================================================

function showFloorMessage(
    message,
    type = ""
) {

    if (
        !floorMessage
    ) {

        return;

    }


    floorMessage.textContent =
        message;


    floorMessage.className =
        "message " +
        type;

}


// ============================================================
// LOGOUT
// ============================================================

if (
    logoutButton
) {

    logoutButton.addEventListener(
        "click",
        async function () {

            await supabaseClient
                .auth
                .signOut();


            window.location.href =
                "index.html";

        }
    );

}


// ============================================================
// BACK TO PROPERTIES
// ============================================================

if (
    backButton
) {

    backButton.addEventListener(
        "click",
        function () {

            window.location.href =
                "properties.html";

        }
    );

}


// ============================================================
// AUTH + ADMIN CHECK
// ============================================================

async function checkAdmin() {

    const {
        data: {
            session
        },
        error: sessionError
    } =
        await supabaseClient
            .auth
            .getSession();


    if (
        sessionError ||
        !session
    ) {

        window.location.href =
            "index.html";

        return null;

    }


    const {
        data: profile,
        error
    } =
        await supabaseClient
            .from(
                "profiles"
            )
            .select(
                "full_name, role, is_active"
            )
            .eq(
                "id",
                session.user.id
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


        window.location.href =
            "index.html";

        return null;

    }


    if (
        !profile.is_active ||
        (
            profile.role !==
            "superadmin" &&
            profile.role !==
            "admin"
        )
    ) {

        await supabaseClient
            .auth
            .signOut();


        window.location.href =
            "index.html";

        return null;

    }


    const adminName =
        document.getElementById(
            "adminName"
        );

    const adminRole =
        document.getElementById(
            "adminRole"
        );


    if (
        adminName
    ) {

        adminName.textContent =
            profile.full_name ||
            "Administrator";

    }


    if (
        adminRole
    ) {

        adminRole.textContent =
            profile.role ===
            "superadmin"
                ? "Superadmin"
                : "Admin";

    }


    return {
        session,
        profile
    };

}


// ============================================================
// RENDER PROPERTY INFO
// ============================================================

function renderPropertyInfo() {

    if (
        !propertyInfo
    ) {

        return;

    }


    if (
        !currentProperty
    ) {

        propertyInfo.textContent =
            t(
                "adminNoPropertySelected",
                {},
                "Ingen bolig er valgt."
            );

        return;

    }


    propertyInfo.innerHTML = `
        <strong>
            ${escapeHtml(
        currentProperty.name
    )}
        </strong>
        <br>
        ${escapeHtml(
        currentProperty.address
    )}
    `;

}


// ============================================================
// LOAD PROPERTY
// ============================================================

async function loadProperty() {

    if (
        !propertyId
    ) {

        console.error(
            "PROPERTY ID MANGLER I URL"
        );


        currentProperty =
            null;


        renderPropertyInfo();


        if (
            floorList
        ) {

            floorList.innerHTML = `
                <p class="message error">
                    ${t(
                "adminNoPropertySelected",
                {},
                "Ingen bolig er valgt."
            )}
                </p>
            `;

        }


        if (
            floorForm
        ) {

            floorForm.style.display =
                "none";

        }


        return false;

    }


    const {
        data: property,
        error
    } =
        await supabaseClient
            .from(
                "properties"
            )
            .select(
                "id, name, address, floor_count"
            )
            .eq(
                "id",
                propertyId
            )
            .eq(
                "is_active",
                true
            )
            .single();


    if (
        error ||
        !property
    ) {

        console.error(
            "LOAD PROPERTY ERROR:",
            error
        );


        currentProperty =
            null;


        if (
            propertyInfo
        ) {

            propertyInfo.textContent =
                t(
                    "adminCouldNotLoadProperty",
                    {},
                    "Kunne ikke hente bolig."
                );

        }


        if (
            floorList
        ) {

            floorList.innerHTML = `
                <p class="message error">
                    ${t(
                "adminCouldNotLoadProperty",
                {},
                "Kunne ikke hente boligen."
            )}
                </p>
            `;

        }


        if (
            floorForm
        ) {

            floorForm.style.display =
                "none";

        }


        return false;

    }


    currentProperty =
        property;


    renderPropertyInfo();


    if (
        floorForm
    ) {

        floorForm.style.display =
            "";

    }


    return true;

}


// ============================================================
// RENDER FLOORS
// ============================================================

function renderFloors() {

    if (
        !floorList
    ) {

        return;

    }


    if (
        !currentFloors ||
        currentFloors.length ===
        0
    ) {

        floorList.innerHTML = `
            <p class="empty-state">
                ${t(
            "adminNoFloorsCreated",
            {},
            "Ingen etasjer er opprettet ennå."
        )}
            </p>
        `;

        return;

    }


    floorList.innerHTML =
        currentFloors
            .map(
                function (
                    floor
                ) {

                    return `
                        <div class="property-row">

                            <div>

                                <h3>
                                    🏢
                                    ${escapeHtml(
                        floor.name
                    )}
                                </h3>

                                <p>
                                    ${t(
                        "adminFloorNumberDisplay",
                        {
                            floor:
                            floor.floor_number
                        },
                        "Etasje " +
                        floor.floor_number
                    )}
                                </p>

                            </div>


                            <div class="property-actions">

                                <button
                                    type="button"
                                    class="secondary-button edit-floor-button"
                                    data-floor-id="${floor.id}"
                                    data-floor-number="${floor.floor_number}"
                                    data-floor-name="${escapeHtml(
                        floor.name
                    )}"
                                >
                                    ${t(
                        "adminEdit",
                        {},
                        "Rediger"
                    )}
                                </button>


                                <button
                                    type="button"
                                    class="secondary-button delete-floor-button"
                                    data-floor-id="${floor.id}"
                                    data-floor-name="${escapeHtml(
                        floor.name
                    )}"
                                >
                                    ${t(
                        "adminDelete",
                        {},
                        "Slett"
                    )}
                                </button>

                            </div>

                        </div>
                    `;

                }
            )
            .join(
                ""
            );


    bindFloorButtons();

}


// ============================================================
// LOAD FLOORS
// ============================================================

async function loadFloors() {

    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "floors"
            )
            .select(
                "id, property_id, floor_number, name, created_at"
            )
            .eq(
                "property_id",
                propertyId
            )
            .order(
                "floor_number",
                {
                    ascending:
                        true
                }
            );


    if (
        error
    ) {

        console.error(
            "LOAD FLOORS ERROR:",
            error
        );


        currentFloors =
            [];


        if (
            floorList
        ) {

            floorList.innerHTML = `
                <p class="message error">
                    ${t(
                "adminCouldNotLoadFloors",
                {},
                "Kunne ikke hente etasjer."
            )}
                </p>
            `;

        }


        return;

    }


    currentFloors =
        data || [];


    renderFloors();

}


// ============================================================
// BIND FLOOR BUTTONS
// ============================================================

function bindFloorButtons() {

    document
        .querySelectorAll(
            ".edit-floor-button"
        )
        .forEach(
            function (
                button
            ) {

                button.addEventListener(
                    "click",
                    function () {

                        startEditFloor(
                            button.dataset.floorId,
                            button.dataset.floorNumber,
                            button.dataset.floorName
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll(
            ".delete-floor-button"
        )
        .forEach(
            function (
                button
            ) {

                button.addEventListener(
                    "click",
                    async function () {

                        await deleteFloor(
                            button.dataset.floorId,
                            button.dataset.floorName
                        );

                    }
                );

            }
        );

}


// ============================================================
// UPDATE SAVE BUTTON TEXT
// ============================================================

function updateSaveFloorButtonText() {

    if (
        !saveFloorButton
    ) {

        return;

    }


    saveFloorButton.textContent =
        editingFloorId
            ? t(
                "adminUpdateFloor",
                {},
                "Oppdater etasje"
            )
            : t(
                "adminSaveFloor",
                {},
                "Lagre etasje"
            );

}


// ============================================================
// START EDIT
// ============================================================

function startEditFloor(
    floorId,
    floorNumber,
    floorName
) {

    editingFloorId =
        floorId;


    floorNumberInput.value =
        floorNumber;


    floorNameInput.value =
        floorName;


    updateSaveFloorButtonText();


    showFloorMessage(
        t(
            "adminEditingFloor",
            {
                name:
                floorName
            },
            "Du redigerer " +
            floorName +
            "."
        ),
        "success"
    );


    floorNumberInput.focus();

}


// ============================================================
// CANCEL EDIT
// ============================================================

function cancelEditFloor() {

    editingFloorId =
        null;


    if (
        floorForm
    ) {

        floorForm.reset();

    }


    updateSaveFloorButtonText();


    showFloorMessage(
        ""
    );

}


// ============================================================
// CREATE / UPDATE FLOOR
// ============================================================

if (
    floorForm
) {

    floorForm.addEventListener(
        "submit",
        async function (
            event
        ) {

            event.preventDefault();


            const floorNumber =
                Number(
                    floorNumberInput.value
                );


            const floorName =
                floorNameInput
                    .value
                    .trim();


            // ----------------------------------------------------
            // VALIDATION
            // ----------------------------------------------------

            if (
                !Number.isInteger(
                    floorNumber
                ) ||
                floorNumber < 1
            ) {

                showFloorMessage(
                    t(
                        "adminEnterValidFloorNumber",
                        {},
                        "Skriv inn et gyldig etasjenummer."
                    ),
                    "error"
                );

                return;

            }


            if (
                !floorName
            ) {

                showFloorMessage(
                    t(
                        "adminEnterFloorName",
                        {},
                        "Skriv inn navn på etasjen."
                    ),
                    "error"
                );

                return;

            }


            // ----------------------------------------------------
            // DISABLE BUTTON
            // ----------------------------------------------------

            saveFloorButton.disabled =
                true;


            saveFloorButton.textContent =
                editingFloorId
                    ? t(
                        "adminUpdating",
                        {},
                        "Oppdaterer..."
                    )
                    : t(
                        "adminSaving",
                        {},
                        "Lagrer..."
                    );


            showFloorMessage(
                ""
            );


            // ----------------------------------------------------
            // UPDATE
            // ----------------------------------------------------

            if (
                editingFloorId
            ) {

                const {
                    error
                } =
                    await supabaseClient
                        .from(
                            "floors"
                        )
                        .update(
                            {
                                floor_number:
                                floorNumber,

                                name:
                                floorName
                            }
                        )
                        .eq(
                            "id",
                            editingFloorId
                        )
                        .eq(
                            "property_id",
                            propertyId
                        );


                if (
                    error
                ) {

                    console.error(
                        "UPDATE FLOOR ERROR:",
                        error
                    );


                    if (
                        error.code ===
                        "23505"
                    ) {

                        showFloorMessage(
                            t(
                                "adminFloorNumberAlreadyRegistered",
                                {},
                                "Dette etasjenummeret er allerede registrert for boligen."
                            ),
                            "error"
                        );

                    } else if (
                        error.code ===
                        "42501"
                    ) {

                        showFloorMessage(
                            t(
                                "adminNoPermissionUpdateFloor",
                                {},
                                "Du har ikke tilgang til å endre denne etasjen."
                            ),
                            "error"
                        );

                    } else {

                        showFloorMessage(
                            t(
                                "adminCouldNotUpdateFloor",
                                {},
                                "Kunne ikke oppdatere etasjen."
                            ),
                            "error"
                        );

                    }


                    saveFloorButton.disabled =
                        false;


                    updateSaveFloorButtonText();

                    return;

                }


                showFloorMessage(
                    t(
                        "adminFloorUpdated",
                        {},
                        "Etasjen ble oppdatert."
                    ),
                    "success"
                );


                editingFloorId =
                    null;


                floorForm.reset();


                await loadFloors();


                saveFloorButton.disabled =
                    false;


                updateSaveFloorButtonText();

                return;

            }


            // ----------------------------------------------------
            // INSERT
            // ----------------------------------------------------

            const {
                error
            } =
                await supabaseClient
                    .from(
                        "floors"
                    )
                    .insert(
                        {
                            property_id:
                            propertyId,

                            floor_number:
                            floorNumber,

                            name:
                            floorName
                        }
                    );


            if (
                error
            ) {

                console.error(
                    "CREATE FLOOR ERROR:",
                    error
                );


                if (
                    error.code ===
                    "23505"
                ) {

                    showFloorMessage(
                        t(
                            "adminFloorNumberAlreadyRegistered",
                            {},
                            "Dette etasjenummeret er allerede registrert for boligen."
                        ),
                        "error"
                    );

                } else if (
                    error.code ===
                    "42501"
                ) {

                    showFloorMessage(
                        t(
                            "adminNoPermissionCreateFloor",
                            {},
                            "Du har ikke tilgang til å opprette denne etasjen."
                        ),
                        "error"
                    );

                } else {

                    showFloorMessage(
                        t(
                            "adminCouldNotSaveFloor",
                            {},
                            "Kunne ikke lagre etasjen."
                        ),
                        "error"
                    );

                }


                saveFloorButton.disabled =
                    false;


                updateSaveFloorButtonText();

                return;

            }


            showFloorMessage(
                t(
                    "adminFloorSaved",
                    {},
                    "Etasjen ble lagret."
                ),
                "success"
            );


            floorForm.reset();


            await loadFloors();


            saveFloorButton.disabled =
                false;


            updateSaveFloorButtonText();

        }
    );

}


// ============================================================
// DELETE FLOOR
// ============================================================

async function deleteFloor(
    floorId,
    floorName
) {

    const confirmed =
        window.confirm(
            t(
                "adminConfirmDeleteFloor",
                {
                    name:
                    floorName
                },
                "Er du sikker på at du vil slette " +
                floorName +
                "?"
            )
        );


    if (
        !confirmed
    ) {

        return;

    }


    const {
        error
    } =
        await supabaseClient
            .from(
                "floors"
            )
            .delete()
            .eq(
                "id",
                floorId
            )
            .eq(
                "property_id",
                propertyId
            );


    if (
        error
    ) {

        console.error(
            "DELETE FLOOR ERROR:",
            error
        );


        if (
            error.code ===
            "42501"
        ) {

            showFloorMessage(
                t(
                    "adminNoPermissionDeleteFloor",
                    {},
                    "Du har ikke tilgang til å slette denne etasjen."
                ),
                "error"
            );

        } else {

            showFloorMessage(
                t(
                    "adminCouldNotDeleteFloor",
                    {},
                    "Kunne ikke slette etasjen."
                ),
                "error"
            );

        }


        return;

    }


    showFloorMessage(
        t(
            "adminFloorDeleted",
            {},
            "Etasjen ble slettet."
        ),
        "success"
    );


    if (
        editingFloorId ===
        floorId
    ) {

        cancelEditFloor();

    }


    await loadFloors();

}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHtml(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value ??
        "";


    return div.innerHTML;

}


// ============================================================
// LANGUAGE CHANGE
// ============================================================

window.addEventListener(
    "cleanplan:languagechange",
    function () {

        renderPropertyInfo();

        renderFloors();

        updateSaveFloorButtonText();

    }
);


// ============================================================
// START
// ============================================================

async function initFloorsPage() {

    const result =
        await checkAdmin();


    if (
        !result
    ) {

        return;

    }


    const propertyLoaded =
        await loadProperty();


    if (
        !propertyLoaded
    ) {

        return;

    }


    await loadFloors();


    updateSaveFloorButtonText();

}


// ============================================================
// INITIALIZE PAGE
// ============================================================

initFloorsPage();