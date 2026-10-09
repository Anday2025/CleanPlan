
// ============================================================
// CLEANPLAN
// LANGUAGE SYSTEM
//
// Interface languages:
// - Norwegian (NO)
// - English (EN)
//
// Dynamic cleaning-task translation is handled separately
// through Supabase / Translation API.
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // ========================================================
        // AVAILABLE INTERFACE LANGUAGES
        // ========================================================

        const languages = [

            {
                code: "no",
                shortCode: "NO",
                flag: "🇳🇴"
            },

            {
                code: "en",
                shortCode: "EN",
                flag: "🇬🇧"
            }

        ];


        // ========================================================
        // TRANSLATIONS
        // ========================================================

        const translations = {


            // ====================================================
            // NORWEGIAN
            // ====================================================

            no: {


                // =================================================
                // GENERAL / LOGIN
                // =================================================

                login:
                    "Logg inn",

                loginUppercase:
                    "LOGG INN",

                logout:
                    "Logg ut",

                landingTitleLine1:
                    "Hold rengjøringen",

                landingTitleLine2:
                    "enkel og oversiktlig",

                landingDescription:
                    "Hold oversikt over oppgaver, ansvar og utført rengjøring – på ett sted.",

                benefitPlan:
                    "Se din rengjøringsplan",

                benefitDocument:
                    "Dokumenter utført rengjøring",

                benefitResidents:
                    "Samarbeid med andre beboere",

                properties:
                    "Boliger",

                cleaningPlan:
                    "Rengjøringsplan",

                documentation:
                    "Dokumentasjon",

                swapTasks:
                    "Bytte oppgaver",

                email:
                    "E-post",

                emailLabel:
                    "E-post",

                password:
                    "Passord",

                emailPlaceholder:
                    "din@epost.no",

                passwordPlaceholder:
                    "Ditt passord",

                or:
                    "eller",

                forgotPassword:
                    "Glemt passord?",

                closeLogin:
                    "Lukk innlogging",


                settingsBack: "← Tilbake til oversikt",
                cleaningSettingsTitle: "Rengjøringsinnstillinger",
                cleaningSettingsDescription: "Velg bolig og etasje for å administrere rengjøringsdag og tidsfrist.",
                settingsProperty: "Velg bolig",
                settingsFloor: "Velg etasje",
                settingsCleaningDay: "Rengjøringsdag",
                settingsDeadline: "Frist",
                settingsAllowEarly: "Tillat rengjøring én dag tidligere",
                settingsSave: "Lagre innstillinger",


                // =================================================
                // LANGUAGE
                // =================================================

                languageNorwegian:
                    "Norsk",

                languageEnglish:
                    "Engelsk",

                languageSelectorAria:
                    "Velg språk",


                // =================================================
                // ADMIN / SUPERADMIN DASHBOARD
                // =================================================

                adminPageTitle:
                    "CleanPlan - Admin",

                adminRoleLabel:
                    "ADMIN",

                adminDashboard:
                    "Dashboard",

                adminProperties:
                    "Boliger",

                adminFloors:
                    "Etasjer",

                adminResidents:
                    "Beboere",

                adminCleaningPlan:
                    "Rengjøringsplan",

                adminUsers:
                    "Brukere",

                adminHistory:
                    "Historikk",


                // =================================================
                // ADMIN HISTORY PAGE
                // =================================================

                historyBack:
                    "← Tilbake til oversikt",

                historyPageTitle:
                    "Logg og dokumentasjon",

                historyPageDescription:
                    "Søk etter rengjøringshistorikk i boliger og etasjer du har tilgang til.",

                historyPropertyLabel:
                    "Bolig",

                historyFloorLabel:
                    "Etasje",

                historySearchButton:
                    "Søk i logg",

                historyLoadingProperties:
                    "Laster boliger …",

                historyInitialMessage:
                    "Loggen blir tilgjengelig når datatilkoblingen er ferdig.",

                historySelectProperty:
                    "Velg bolig",

                historyAllFloors:
                    "Alle etasjer",

                historySelectPropertyFirst:
                    "Velg en bolig først.",

                historyResponsibleResident:
                    "Ansvarlig beboer",

                historyNotAssigned:
                    "Ikke tildelt",

                historyUnknownResident:
                    "Ukjent beboer",

                historyStatus:
                    "Status",

                historyPending:
                    "Venter",

                historyCompleted:
                    "Fullført",

                historySkipped:
                    "Hoppet over",

                historyCancelled:
                    "Avbrutt",

                historySigned:
                    "Signert",

                historyNotSigned:
                    "Ikke signert",

                historyDocumentationImages:
                    "Dokumentasjonsbilder",

                historyNoPlans:
                    "Ingen rengjøringsplaner funnet.",

                historyNoEntries:
                    "Ingen rengjøringshistorikk funnet.",

                historyLoading:
                    "Henter rengjøringshistorikk ...",

                historySearchPrompt:
                    "Velg bolig og etasje for å søke.",


                adminSettings:
                    "Innstillinger",

                adminLogout:
                    "Logg ut",

                adminOpenMenu:
                    "Åpne meny",



                adminAdministratorEyebrow:
                    "ADMINISTRATOR",

                adminWelcome:
                    "Velkommen",

                adminWelcomeDescription:
                    "Administrer boliger, beboere, brukere og rengjøringsplaner.",

                adminOverviewAria:
                    "Oversikt",

                adminRegisteredProperties:
                    "Registrerte boliger",

                adminActiveResidents:
                    "Aktive beboere",

                adminActiveUsers:
                    "Aktive brukere",

                adminCleaningPlans:
                    "Rengjøringsplaner",

                adminActivePlans:
                    "Aktive planer",

                adminAdministration:
                    "ADMINISTRASJON",

                adminManageCleanPlan:
                    "Administrer CleanPlan",

                adminChooseArea:
                    "Velg området du ønsker å administrere.",

                adminPropertiesLabel:
                    "BOLIGER",

                adminResidentsLabel:
                    "BEBOERE",

                adminUsersLabel:
                    "BRUKERE",

                adminCleaningPlanLabel:
                    "RENGJØRINGSPLAN",

                adminCreateManageProperties:
                    "Opprett og administrer boliger og etasjer.",

                adminOpenProperties:
                    "Åpne boliger",

                adminManageResidents:
                    "Administrer beboere og deres tilknytning til bolig og etasje.",

                adminOpenResidents:
                    "Åpne beboere",

                adminCreateManageUsers:
                    "Opprett og administrer brukere, kontoer og roller.",

                adminOpenUsers:
                    "Åpne brukere",

                adminManageCleaningPlan:
                    "Opprett rengjøringsoppgaver, administrer planer og den ukentlige rengjøringsrotasjonen.",

                adminOpenCleaningPlan:
                    "Åpne rengjøringsplan",


                // =================================================
                // ADMIN - PROPERTIES
                // =================================================

                adminPropertiesPageTitle:
                    "CleanPlan - Boliger",

                adminPropertiesPageDescription:
                    "Administrer boliger og etasjer.",

                adminAddProperty:
                    "Legg til bolig",

                adminAddPropertyDescription:
                    "Opprett en ny bolig som skal brukes i CleanPlan.",

                adminPropertyName:
                    "Bolignavn",

                adminPropertyNamePlaceholder:
                    "For eksempel Hovedbolig",

                adminPropertyAddress:
                    "Adresse",

                adminPropertyAddressPlaceholder:
                    "For eksempel Nye Sandviksveien 46",

                adminFloorCount:
                    "Antall etasjer",

                adminSaveProperty:
                    "Lagre bolig",

                adminPropertiesAccessDescription:
                    "Boliger du har tilgang til å administrere.",

                adminShowProperties:
                    "Vis boliger",

                adminHideProperties:
                    "Skjul boliger",

                adminPropertySearchPlaceholder:
                    "Søk etter bolignavn eller adresse...",

                adminPropertySearchAria:
                    "Søk etter bolig",

                adminLoadingProperties:
                    "Laster boliger...",

                adminNoPropertiesFound:
                    "Ingen boliger funnet",

                adminTryAnotherPropertySearch:
                    "Prøv et annet bolignavn eller en annen adresse.",

                adminPropertySingularFound:
                    "{count} bolig funnet",

                adminPropertyPluralFound:
                    "{count} boliger funnet",

                adminHistoryComingSoon:
                    "Historikk kommer i et senere steg.",

                adminSettingsComingSoon:
                    "Innstillinger kommer i et senere steg.",


                // =================================================
                // ADMIN - PROPERTIES DYNAMIC
                // =================================================

                adminDeactivatedProperties:
                    "Deaktiverte boliger",

                adminDeactivatedPropertiesDescription:
                    "Deaktiverte boliger kan gjenopprettes i opptil 2 måneder.",

                adminAuditCreatedBy:
                    "Opprettet av",

                adminAuditUpdatedBy:
                    "Endret av",

                adminAuditDeactivatedBy:
                    "Deaktivert av",

                adminAuditRestoredBy:
                    "Gjenopprettet av",

                adminAuditPermanentlyDeletedBy:
                    "Permanent slettet av",

                adminCouldNotLoadHistory:
                    "Kunne ikke hente historikken.",

                adminNoActivityRegistered:
                    "Ingen aktivitet registrert.",

                adminActivityHistory:
                    "Aktivitet / historikk",

                adminUnknownUser:
                    "Ukjent bruker",

                adminHideHistory:
                    "Skjul historikk",

                adminCouldNotLoadProperties:
                    "Kunne ikke hente boliger.",

                adminNoActiveProperties:
                    "Ingen aktive boliger er opprettet ennå.",

                adminOneFloor:
                    "{count} etasje",

                adminMultipleFloors:
                    "{count} etasjer",

                adminOpen:
                    "Åpne",

                adminDeactivateProperty:
                    "Deaktiver bolig",

                adminConfirmDeactivateProperty:
                    "Vil du deaktivere boligen \"{name}\"?\n\nBoligen blir ikke slettet med en gang. Den kan gjenopprettes i 2 måneder før permanent sletting.",

                adminDeactivating:
                    "Deaktiverer...",

                adminCouldNotDeactivateProperty:
                    "Kunne ikke deaktivere boligen.",

                adminPropertyCouldNotBeDeactivated:
                    "Boligen kunne ikke deaktiveres.",

                adminPropertyDeactivated:
                    "Boligen ble deaktivert.",

                adminDeactivated:
                    "Deaktivert",

                adminPermanentDeletion:
                    "Permanent sletting",

                adminRestoreProperty:
                    "Gjenopprett bolig",

                adminConfirmRestoreProperty:
                    "Vil du gjenopprette denne boligen?",

                adminRestoring:
                    "Gjenoppretter...",

                adminCouldNotRestoreProperty:
                    "Kunne ikke gjenopprette boligen.",

                adminPropertyCouldNotBeRestored:
                    "Boligen kunne ikke gjenopprettes. 2-månedersfristen kan være utløpt.",

                adminPropertyRestored:
                    "Boligen ble gjenopprettet.",

                adminFillAllFields:
                    "Fyll inn alle feltene.",

                adminSaving:
                    "Lagrer...",

                adminAddressAlreadyRegistered:
                    "Denne adressen er allerede registrert.",

                adminCouldNotSaveProperty:
                    "Kunne ikke lagre boligen.",

                adminPropertySaved:
                    "Boligen ble lagret.",



                // =================================================
                // ADMIN - FLOORS
                // =================================================

                adminFloorsPageTitle:
                    "CleanPlan - Etasjer",

                adminFloorsPageDescription:
                    "Administrer etasjer for valgt bolig.",

                adminLoadingProperty:
                    "Laster bolig...",

                adminBackToProperties:
                    "Tilbake til boliger",

                adminAddFloor:
                    "Legg til etasje",

                adminAddFloorDescription:
                    "Opprett en etasje for denne boligen.",

                adminFloorNumber:
                    "Etasjenummer",

                adminFloorName:
                    "Navn på etasje",

                adminFloorNamePlaceholder:
                    "For eksempel 1. etasje",

                adminSaveFloor:
                    "Lagre etasje",

                adminRegisteredFloors:
                    "Registrerte etasjer",

                adminLoadingFloors:
                    "Laster etasjer...",

                adminNoPropertySelected:
                    "Ingen bolig er valgt.",

                adminCouldNotLoadProperty:
                    "Kunne ikke hente boligen.",

                adminCouldNotLoadFloors:
                    "Kunne ikke hente etasjer.",

                adminNoFloorsCreated:
                    "Ingen etasjer er opprettet ennå.",

                adminFloorNumberDisplay:
                    "Etasje {floor}",

                adminEdit:
                    "Rediger",

                adminDelete:
                    "Slett",

                adminUpdateFloor:
                    "Oppdater etasje",

                adminEditingFloor:
                    "Du redigerer {name}.",

                adminEnterValidFloorNumber:
                    "Skriv inn et gyldig etasjenummer.",

                adminEnterFloorName:
                    "Skriv inn navn på etasjen.",

                adminUpdating:
                    "Oppdaterer...",

                adminFloorNumberAlreadyRegistered:
                    "Dette etasjenummeret er allerede registrert for boligen.",

                adminNoPermissionUpdateFloor:
                    "Du har ikke tilgang til å endre denne etasjen.",

                adminCouldNotUpdateFloor:
                    "Kunne ikke oppdatere etasjen.",

                adminFloorUpdated:
                    "Etasjen ble oppdatert.",

                adminNoPermissionCreateFloor:
                    "Du har ikke tilgang til å opprette denne etasjen.",

                adminCouldNotSaveFloor:
                    "Kunne ikke lagre etasjen.",

                adminFloorSaved:
                    "Etasjen ble lagret.",

                adminConfirmDeleteFloor:
                    "Er du sikker på at du vil slette {name}?",

                adminNoPermissionDeleteFloor:
                    "Du har ikke tilgang til å slette denne etasjen.",

                adminCouldNotDeleteFloor:
                    "Kunne ikke slette etasjen.",

                adminFloorDeleted:
                    "Etasjen ble slettet.",


                // =================================================
                // RESIDENT PAGE
                // =================================================

                residentPageTitle:
                    "CleanPlan - Min side",

                residentRole:
                    "BEBOER",

                residentWelcomeDescription:
                    "Her finner du boligen din, rengjøringsplanen og dine kommende rengjøringsuker.",

                loading:
                    "Laster...",

                residentCleaningEyebrow:
                    "RENGJØRINGSPLAN",

                overview:
                    "OVERSIKT",

                residentDashboardTitle:
                    "Min oversikt",

                residentCleaningDescription:
                    "Se rengjøringsuker, oppgaver og hvem som er ansvarlig.",

                residentDashboardDescription:
                    "Velg området du vil åpne.",

                residentPhotosEyebrow:
                    "BILDER",

                residentPhotosHeading:
                    "📷 Bilder",

                residentPhotosPageDescription:
                    "Dokumenter utført rengjøring med kameraet.",

                residentPhotoCount:
                    "Bilder",

                residentNextCleaningLabel:
                    "Neste rengjøring",

                residentPropertyCardDescription:
                    "Se registrert bolig, adresse og etasje.",

                residentOpenProperty:
                    "Åpne bolig",

                residentPropertyEyebrow:
                    "MIN BOLIG",

                residentCleaningCardDescription:
                    "Se rengjøringsuker, oppgaver og hvem som er ansvarlig.",

                residentOpenCleaning:
                    "Åpne rengjøringsplan",

                residentPhotosTitle:
                    "Bilder",

                residentPhotosDescription:
                    "Dokumenter rengjøringen med bilder fra kameraet.",

                residentOpenPhotos:
                    "Åpne bilder",

                residentLoadingDescription:
                    "Henter kontoen og rengjøringsplanen din.",

                propertyAssociation:
                    "Boligtilknytning",

                accountActive:
                    "Kontoen din er aktiv.",

                notAssignedProperty:
                    "Du er ikke tilknyttet en bolig ennå",

                notAssignedPropertyDescription:
                    "Kontoen din er opprettet og klar til bruk, men administrator har ikke koblet deg til en bolig og etasje ennå.",

                contactAdministratorProperty:
                    "Kontakt administrator dersom du mener at boligtilknytningen allerede skulle vært registrert.",

                myProperty:
                    "Min bolig",

                registeredPropertyFloor:
                    "Din registrerte bolig og etasje.",

                active:
                    "Aktiv",

                noCleaningPlanYet:
                    "Ingen rengjøringsplan ennå",

                noCleaningPlanDescription:
                    "Administrator har ikke opprettet en rengjøringsplan for etasjen din ennå.",

                thisWeek:
                    "DENNE UKEN",

                date:
                    "Dato",

                responsible:
                    "Ansvarlig",

                time:
                    "Tid",

                floor:
                    "Etasje",

                thursdayFallbackWarning:
                    "Hvis fredag ikke er mulig, skal rengjøringen utføres på torsdag.",

                viewPreviousUpcomingWeeks:
                    "Se tidligere og kommende uker.",

                previous:
                    "Forrige",

                next:
                    "Neste",

                selectedWeek:
                    "Valgt uke",

                status:
                    "Status",

                cleaningTasks:
                    "Rengjøringsoppgaver",

                noCleaningTasks:
                    "Det er ingen rengjøringsoppgaver registrert ennå.",


                // =================================================
                // DOCUMENTATION / CAMERA
                // =================================================

                documentWork:
                    "Dokumenter arbeidet",

                documentWorkDescription:
                    "Ta nye bilder med kameraet etter at rengjøringen er utført.",

                takePhoto:
                    "Ta bilde",

                takePhotoWithIcon:
                    "📷 Ta bilde",

                maxTenPhotos:
                    "Maks 10 bilder",

                maxTenPhotosAlert:
                    "Du kan legge til maksimalt 10 bilder.",

                photosCount:
                    "Bilder ({count}/10)",

                documentationPhotoAlt:
                    "Dokumentasjonsbilde",

                cleaningDocumentationPhoto:
                    "Dokumentasjonsbilde",

                removePhotoAria:
                    "Fjern bilde",

                deletePhoto:
                    "Slett bilde",

                maxPhotosTaken:
                    "✓ Maks antall bilder tatt",


                // =================================================
                // CONFIRM AND SIGN
                // =================================================

                confirmAndSign:
                    "Bekreft og signer",

                confirmAndSignDescription:
                    "Bekreft når alle oppgavene er utført og dokumentasjonen er lagt til.",

                signedBy:
                    "Signeres av",

                week:
                    "Uke",

                confirmCleaningCompleted:
                    "Bekreft og signer rengjøring utført",

                couldNotLoadPage:
                    "Kunne ikke laste siden",


                // =================================================
                // DYNAMIC RESIDENT TEXT
                // =================================================

                welcomeUser:
                    "Velkommen, {name}",

                propertyFallbackName:
                    "Bolig",

                noAddressRegistered:
                    "Ingen adresse registrert",

                floorPrefix:
                    "Etasje: {floor}",

                notRegistered:
                    "Ikke registrert",

                floorNumber:
                    "{floor}. etasje",

                couldNotFetchPropertyAssociation:
                    "Kunne ikke hente boligtilknytningen din.",

                couldNotFetchCleaningPlan:
                    "Kunne ikke hente rengjøringsplanen.",

                couldNotFetchCleaningTasks:
                    "Kunne ikke hente rengjøringsoppgavene.",

                couldNotFetchCleaningRotation:
                    "Kunne ikke hente rengjøringsrotasjonen.",

                noActiveCleaningPlan:
                    "Ingen aktiv rengjøringsplan er opprettet ennå.",

                notAssigned:
                    "Ikke tildelt",

                scheduled:
                    "Planlagt",

                planned:
                    "Planlagt",

                previousWeekStatus:
                    "Tidligere uke",

                upcoming:
                    "Kommende",

                notAvailableYet:
                    "Ikke tilgjengelig ennå",

                notYetAvailable:
                    "Ikke tilgjengelig ennå",

                open:
                    "Åpen",

                deadlinePassed:
                    "Frist utløpt",

                completed:
                    "Fullført ✓",

                notCompleted:
                    "Ikke fullført",

                cleaningWeekHeading:
                    "Rengjøring • Uke {week}",

                weekLabel:
                    "Uke {week}",

                zeroTasks:
                    "0 oppgaver",

                oneTask:
                    "{count} oppgave",

                multipleTasks:
                    "{count} oppgaver",

                cleaningTask:
                    "Rengjøringsoppgave",

                tasksCreatedByAdministrator:
                    "Oppgavene er opprettet av administrator.",

                tasksVisibleOnlyResponsibleCanComplete:
                    "Du kan se oppgavene, men bare ukens ansvarlige kan fullføre dem.",

                onlyNameCanComplete:
                    "Kun {name} kan fullføre denne uken.",

                onlyResponsibleCanConfirm:
                    "🔒 Kun ukens ansvarlige kan bekrefte rengjøringen.",

                onlyResponsibleResidentCanComplete:
                    "Kun den ansvarlige beboeren kan fullføre denne uken.",

                responsibleOnlyForWeek:
                    "🔒 Kun den ansvarlige for denne uken kan fullføre rengjøringen.",

                notActiveCleaningWeek:
                    "Dette er ikke den aktive rengjøringsuken.",

                tasksOnlyCurrentWeek:
                    "Oppgaver kan bare fullføres i den aktuelle uken.",

                onlyCurrentWeekCanBeCompleted:
                    "Bare den aktuelle rengjøringsuken kan fullføres.",

                selectCurrentWeekToClean:
                    "🔒 Velg den aktuelle uken for å utføre rengjøringen.",

                cleaningAvailableThursday:
                    "Rengjøringen blir tilgjengelig torsdag.",

                notAvailableThursdayFriday:
                    "Ikke tilgjengelig ennå. Rengjøring kan registreres torsdag eller fredag.",

                notYetAvailableLocked:
                    "🔒 Ikke tilgjengelig ennå. Rengjøring kan registreres torsdag eller fredag.",

                confirmationOpensThursday:
                    "🔒 Bekreftelse åpnes torsdag.",

                deadlineExpiredForWeek:
                    "Fristen for denne uken er utløpt.",

                cleaningCannotBeRegistered:
                    "Rengjøringen kan ikke lenger registreres for denne uken.",

                deadlineExpiredLocked:
                    "🔒 Fristen er utløpt.",

                responsibleThisWeekCheckTasks:
                    "Du er ansvarlig denne uken. Huk av oppgavene etter hvert som de utføres.",

                responsibleForThisWeek:
                    "Du er ansvarlig for denne uken.",

                completeTasksAndPhotoBeforeSign:
                    "Fullfør alle oppgaver og ta minst ett nytt bilde før du signerer.",

                cleaningAlreadySigned:
                    "Rengjøringen er allerede signert.",

                couldNotSaveTaskCompletion:
                    "Kunne ikke lagre oppgaven som fullført.",

                couldNotRemoveTaskCompletion:
                    "Kunne ikke fjerne fullføringen av oppgaven.",

                completionReadyForSupabase:
                    "Alle oppgaver er fullført og dokumentasjonen er klar.",

                unexpectedResidentPageError:
                    "Det oppstod en uventet feil på beboersiden.",

                errorOccurred:
                    "Det oppstod en feil.",


                // =================================================
                // CLEANING HISTORY
                // =================================================

                cleaningHistory:
                    "Logg",

                cleaningHistoryEyebrow:
                    "Historikk",

                cleaningHistoryDescription:
                    "Se tidligere rengjøringsuker og dokumentasjon for boligen og etasjen din.",

                closeCleaningHistory:
                    "Lukk historikk",

                loadingCleaningHistory:
                    "Laster rengjøringshistorikk...",

                noCleaningHistory:
                    "Ingen historikk ennå",

                noCleaningHistoryDescription:
                    "Tidligere rengjøringsuker vises her når de blir tilgjengelige.",

                cleaningHistoryResponsible:
                    "Ansvarlig",

                cleaningHistorySignedBy:
                    "Signert av",

                cleaningHistorySignedAt:
                    "Signert",

                cleaningHistoryDocumentation:
                    "Dokumentasjon",

                cleaningHistoryNoDocumentation:
                    "Ingen dokumentasjonsbilder",

                cleaningHistoryWeek:
                    "Uke",


                // =================================================
                // ADMIN - RESIDENTS
                // =================================================

                adminResidentsPageTitle:
                    "CleanPlan - Beboere",

                adminResidentsPageDescription:
                    "Administrer beboere og deres tilknytning til boliger og etasjer.",

                adminAddResident:
                    "Legg til beboer",

                adminAddResidentDescription:
                    "Koble en eksisterende brukerprofil til bolig og etasje.",

                adminResidentProfile:
                    "Brukerprofil",

                adminSelectResidentProfile:
                    "Velg brukerprofil",

                adminProperty:
                    "Bolig",

                adminSelectProperty:
                    "Velg bolig",

                adminFloor:
                    "Etasje",

                adminSelectPropertyFirst:
                    "Velg bolig først",

                adminSelectFloor:
                    "Velg etasje",

                adminCreateResident:
                    "Opprett beboer",

                adminRegisteredResidents:
                    "Registrerte beboere",

                adminResidentsAccessDescription:
                    "Beboere du har tilgang til å administrere.",

                adminShowResidents:
                    "Vis beboere",

                adminHideResidents:
                    "Skjul beboere",

                adminResidentSearchPlaceholder:
                    "Søk etter navn, e-post, bolig eller etasje...",

                adminResidentSearchAria:
                    "Søk etter beboer",

                adminResidentSingularFound:
                    "{count} beboer funnet",

                adminResidentPluralFound:
                    "{count} beboere funnet",

                adminLoadingResidents:
                    "Laster beboere...",

                adminNoResidentsFound:
                    "Ingen beboere funnet",

                adminTryAnotherResidentSearch:
                    "Prøv et annet navn, e-post, bolig eller etasje.",

                adminLoadingUserProfiles:
                    "Laster brukerprofiler...",

                adminCouldNotLoadUserProfiles:
                    "Kunne ikke hente brukerprofiler",

                adminNoActiveResidentUsers:
                    "Ingen aktive beboerbrukere",

                adminNoPropertiesAvailable:
                    "Ingen boliger tilgjengelig",

                adminNoFloorsAvailable:
                    "Ingen etasjer tilgjengelig",

                adminNoResidentsRegistered:
                    "Ingen beboere er registrert ennå.",

                adminCouldNotLoadResidents:
                    "Kunne ikke hente beboere.",

                adminUnknownProperty:
                    "Ukjent bolig",

                adminNoFloor:
                    "Ingen etasje",

                adminSelectProfilePropertyFloor:
                    "Velg brukerprofil, bolig og etasje.",

                adminCreatingResident:
                    "Oppretter...",

                adminResidentAlreadyRegistered:
                    "Denne brukeren er allerede registrert.",

                adminNoPermissionCreateResident:
                    "Du har ikke tilgang til å opprette denne beboeren.",

                adminCouldNotCreateResident:
                    "Kunne ikke opprette beboer.",

                adminResidentCreated:
                    "Beboeren ble opprettet.",


                // =================================================
                // ADMIN - CLEANING PLAN
                // =================================================

                adminCleaningPlanPageTitle:
                    "CleanPlan - Rengjøringsplan",

                adminCleaningPlanAdminTitle:
                    "Rengjøringsplan (Admin)",

                adminCleaningPlanPageDescription:
                    "Lag og administrer oppgaver for rengjøringsplanen.",

                adminCleaningTasksVisibilityInfo:
                    "Oppgavene du lager her vises for alle beboere som bor på denne etasjen.",

                adminAddNewCleaningTask:
                    "Legg til ny oppgave",

                adminTask:
                    "Oppgave",

                adminTaskPlaceholder:
                    "Skriv inn oppgaven her...",

                adminDescription:
                    "Beskrivelse",

                adminOptional:
                    "(valgfritt)",

                adminTaskDescriptionPlaceholder:
                    "Eventuell ekstra informasjon...",

                adminOrder:
                    "Rekkefølge",

                adminLowerNumbersFirst:
                    "Lavere tall vises først.",

                adminAddTask:
                    "Legg til oppgave",

                adminCancelEditing:
                    "Avbryt redigering",

                adminCleaningTasks:
                    "Rengjøringsoppgaver",

                adminActions:
                    "Handlinger",

                adminNoTasksForFloor:
                    "Ingen oppgaver er opprettet for denne etasjen ennå.",

                adminDragDropTaskInfo:
                    "Dra og slipp for å endre rekkefølgen på oppgavene.",

                adminDragToReorder:
                    "Dra for å endre rekkefølgen",

                adminDragTaskAria:
                    "Dra oppgaven for å endre rekkefølgen",

                adminCouldNotLoadCleaningPlan:
                    "Kunne ikke hente rengjøringsplanen.",

                adminCouldNotCreateCleaningPlan:
                    "Kunne ikke opprette rengjøringsplanen.",

                adminCouldNotLoadTasks:
                    "Kunne ikke hente oppgavene.",

                adminSavingNewOrder:
                    "Lagrer ny rekkefølge...",

                adminCouldNotSaveNewOrder:
                    "Kunne ikke lagre den nye rekkefølgen.",

                adminOrderSaved:
                    "Rekkefølgen ble lagret.",

                adminEditTask:
                    "Rediger oppgave",

                adminSaveChanges:
                    "Lagre endringer",

                adminSavingChanges:
                    "Lagrer endringer...",

                adminAddingTask:
                    "Legger til...",

                adminSelectPropertyAndFloorFirst:
                    "Velg bolig og etasje først.",

                adminEnterTask:
                    "Skriv inn en oppgave.",

                adminTaskOrderMinimum:
                    "Rekkefølgen må være 1 eller høyere.",

                adminCouldNotTranslateCleaningTask:
                    "Kunne ikke oversette rengjøringsoppgaven.",

                adminInvalidTranslationResponse:
                    "Ugyldig svar fra oversettelsestjenesten.",

                adminCouldNotUpdateTaskOrder:
                    "Kunne ikke oppdatere rekkefølgen.",

                adminTaskAlreadyExistsOnFloor:
                    "Denne oppgaven finnes allerede på denne etasjen.",

                adminNoPermissionCreateTask:
                    "Du har ikke tilgang til å opprette denne oppgaven.",

                adminCouldNotCreateTask:
                    "Kunne ikke opprette oppgaven.",

                adminCouldNotConnectTaskToPlan:
                    "Kunne ikke koble oppgaven til rengjøringsplanen.",

                adminTaskCreatedTranslationFailed:
                    "Oppgaven ble opprettet, men oversettelsen kunne ikke lagres.",

                adminTaskAdded:
                    "Oppgaven ble lagt til.",

                adminCouldNotFindTask:
                    "Kunne ikke finne oppgaven.",

                adminCouldNotChangeTaskOrder:
                    "Kunne ikke endre rekkefølgen.",

                adminCouldNotSaveTaskOrder:
                    "Kunne ikke lagre rekkefølgen.",

                adminTaskAlreadyExists:
                    "Denne oppgaven finnes allerede.",

                adminNoPermissionUpdateTask:
                    "Du har ikke tilgang til å oppdatere denne oppgaven.",

                adminCouldNotUpdateTask:
                    "Kunne ikke oppdatere oppgaven.",

                adminTaskUpdatedTranslationFailed:
                    "Oppgaven ble oppdatert, men oversettelsen kunne ikke oppdateres.",

                adminTaskUpdated:
                    "Oppgaven ble oppdatert.",

                adminConfirmDeleteTask:
                    "Vil du slette oppgaven \"{name}\"?",

                adminNoPermissionDeleteTask:
                    "Du har ikke tilgang til å slette denne oppgaven.",

                adminCouldNotDeleteTask:
                    "Kunne ikke slette oppgaven.",

                adminTaskDeleted:
                    "Oppgaven ble slettet.",


                // =================================================
                // ADMIN - USERS
                // =================================================

                adminUsersPageTitle:
                    "CleanPlan - Brukere",

                adminUsersPageDescription:
                    "Opprett og administrer brukere og roller.",

                adminCreateUser:
                    "Opprett bruker",

                adminCreateUserDescription:
                    "Opprett en ny bruker for CleanPlan. Brukeren mottar en sikker lenke på e-post for å sette sitt eget passord.",

                adminNameLabel:
                    "Navn",

                adminNamePlaceholder:
                    "For eksempel Ola Nordmann",

                adminRole:
                    "Rolle",

                adminSelectRole:
                    "Velg rolle",

                adminRegisteredUsers:
                    "Registrerte brukere",

                adminUsersAccessDescription:
                    "Brukerprofiler du har tilgang til å administrere.",

                adminShowUsers:
                    "Vis brukere",

                adminHideUsers:
                    "Skjul brukere",

                adminUserSearchPlaceholder:
                    "Søk etter navn, e-post, rolle eller status...",

                adminUserSearchAria:
                    "Søk etter bruker",

                adminUserSingularFound:
                    "{count} bruker funnet",

                adminUserPluralFound:
                    "{count} brukere funnet",

                adminLoadingUsers:
                    "Laster brukere...",

                adminNoUsersFound:
                    "Ingen brukere funnet",

                adminTryAnotherUserSearch:
                    "Prøv et annet navn, e-post, rolle eller status.",

                adminCouldNotVerifyUserRole:
                    "Kunne ikke kontrollere brukerrollen.",

                adminFillAllUserFields:
                    "Fyll ut alle feltene.",

                adminEnterValidEmail:
                    "Skriv inn en gyldig e-postadresse.",

                adminCanOnlyCreateResident:
                    "Admin kan bare opprette Resident-brukere.",

                superadminCanOnlyCreateAdminResident:
                    "Superadmin kan bare opprette Admin eller Resident.",

                adminCreatingUser:
                    "Oppretter...",

                adminCreatingUserMessage:
                    "Oppretter bruker...",

                adminCouldNotCreateUser:
                    "Kunne ikke opprette bruker.",

                adminUserCreatedPasswordLinkSent:
                    "Brukeren ble opprettet. En sikker lenke for å sette passord er sendt til e-postadressen.",

                adminCreateUserUnexpectedError:
                    "Det oppstod en feil ved opprettelse av bruker.",

                adminNoUsersRegistered:
                    "Ingen brukere registrert.",

                adminCouldNotLoadUsers:
                    "Kunne ikke laste brukere.",

                adminRoleSuperadmin:
                    "Superadmin",

                adminRoleAdmin:
                    "Admin",

                adminRoleResident:
                    "Resident",

                adminUnknown:
                    "Ukjent"

            },


            // ====================================================
            // ENGLISH
            // ====================================================

            en: {


                // =================================================
                // GENERAL / LOGIN
                // =================================================

                login:
                    "Log in",

                loginUppercase:
                    "LOG IN",

                logout:
                    "Log out",

                landingTitleLine1:
                    "Keep cleaning",

                landingTitleLine2:
                    "simple and organized",

                landingDescription:
                    "Keep track of tasks, responsibilities and completed cleaning – all in one place.",

                benefitPlan:
                    "View your cleaning schedule",

                benefitDocument:
                    "Document completed cleaning",

                benefitResidents:
                    "Collaborate with other residents",

                properties:
                    "Properties",

                cleaningPlan:
                    "Cleaning schedule",

                documentation:
                    "Documentation",

                swapTasks:
                    "Swap tasks",

                email:
                    "Email",

                emailLabel:
                    "Email",

                password:
                    "Password",

                emailPlaceholder:
                    "your@email.com",

                passwordPlaceholder:
                    "Your password",

                or:
                    "or",

                forgotPassword:
                    "Forgot password?",

                closeLogin:
                    "Close login",


                // =================================================
                // LANGUAGE
                // =================================================

                languageNorwegian:
                    "Norwegian",

                languageEnglish:
                    "English",

                languageSelectorAria:
                    "Choose language",


                // =================================================
                // ADMIN / SUPERADMIN DASHBOARD
                // =================================================

                adminPageTitle:
                    "CleanPlan - Admin",

                adminRoleLabel:
                    "ADMIN",

                adminDashboard:
                    "Dashboard",

                adminProperties:
                    "Properties",

                adminFloors:
                    "Floors",

                adminResidents:
                    "Residents",

                adminCleaningPlan:
                    "Cleaning schedule",

                adminUsers:
                    "Users",

                adminHistory:
                    "History",


                settingsBack: "← Back to dashboard",
                cleaningSettingsTitle: "Cleaning settings",
                cleaningSettingsDescription: "Select a property and floor to manage cleaning days and deadlines.",
                settingsProperty: "Select property",
                settingsFloor: "Select floor",
                settingsCleaningDay: "Cleaning day",
                settingsDeadline: "Deadline",
                settingsAllowEarly: "Allow cleaning one day earlier",
                settingsSave: "Save settings",

                // =================================================
                // ADMIN HISTORY PAGE - ENGLISH
                // =================================================

                historyBack:
                    "← Back to dashboard",

                historyPageTitle:
                    "History and documentation",

                historyPageDescription:
                    "Search cleaning history for properties and floors you have access to.",

                historyPropertyLabel:
                    "Property",

                historyFloorLabel:
                    "Floor",

                historySearchButton:
                    "Search history",

                historyLoadingProperties:
                    "Loading properties …",

                historyInitialMessage:
                    "The log will be available once the data connection is ready.",

                historySelectProperty:
                    "Select property",

                historyAllFloors:
                    "All floors",

                historySelectPropertyFirst:
                    "Select a property first.",

                historyResponsibleResident:
                    "Responsible resident",

                historyNotAssigned:
                    "Not assigned",

                historyUnknownResident:
                    "Unknown resident",

                historyStatus:
                    "Status",

                historyPending:
                    "Pending",

                historyCompleted:
                    "Completed",

                historySkipped:
                    "Skipped",

                historyCancelled:
                    "Cancelled",

                historySigned:
                    "Signed",

                historyNotSigned:
                    "Not signed",

                historyDocumentationImages:
                    "Documentation photos",

                historyNoPlans:
                    "No cleaning schedules found.",

                historyNoEntries:
                    "No cleaning history found.",

                historyLoading:
                    "Loading cleaning history ...",

                historySearchPrompt:
                    "Select a property and floor to search.",


                adminSettings:
                    "Settings",

                adminLogout:
                    "Log out",

                adminOpenMenu:
                    "Open menu",

                adminAdministratorEyebrow:
                    "ADMINISTRATOR",

                adminWelcome:
                    "Welcome",

                adminWelcomeDescription:
                    "Manage properties, residents, users and cleaning schedules.",

                adminOverviewAria:
                    "Overview",

                adminRegisteredProperties:
                    "Registered properties",

                adminActiveResidents:
                    "Active residents",

                adminActiveUsers:
                    "Active users",

                adminCleaningPlans:
                    "Cleaning schedules",

                adminActivePlans:
                    "Active schedules",

                adminAdministration:
                    "ADMINISTRATION",

                adminManageCleanPlan:
                    "Manage CleanPlan",

                adminChooseArea:
                    "Choose the area you want to manage.",

                adminPropertiesLabel:
                    "PROPERTIES",

                adminResidentsLabel:
                    "RESIDENTS",

                adminUsersLabel:
                    "USERS",

                adminCleaningPlanLabel:
                    "CLEANING SCHEDULE",

                adminCreateManageProperties:
                    "Create and manage properties and floors.",

                adminOpenProperties:
                    "Open properties",

                adminManageResidents:
                    "Manage residents and their property and floor assignments.",

                adminOpenResidents:
                    "Open residents",

                adminCreateManageUsers:
                    "Create and manage users, accounts and roles.",

                adminOpenUsers:
                    "Open users",

                adminManageCleaningPlan:
                    "Create cleaning tasks, manage schedules and the weekly cleaning rotation.",

                adminOpenCleaningPlan:
                    "Open cleaning schedule",



                // =================================================
                // ADMIN - PROPERTIES
                // =================================================

                adminPropertiesPageTitle:
                    "CleanPlan - Properties",

                adminPropertiesPageDescription:
                    "Manage properties and floors.",

                adminAddProperty:
                    "Add property",

                adminAddPropertyDescription:
                    "Create a new property to use in CleanPlan.",

                adminPropertyName:
                    "Property name",

                adminPropertyNamePlaceholder:
                    "For example Main Property",

                adminPropertyAddress:
                    "Address",

                adminPropertyAddressPlaceholder:
                    "For example Nye Sandviksveien 46",

                adminFloorCount:
                    "Number of floors",

                adminSaveProperty:
                    "Save property",

                adminPropertiesAccessDescription:
                    "Properties you have permission to manage.",

                adminShowProperties:
                    "Show properties",

                adminHideProperties:
                    "Hide properties",

                adminPropertySearchPlaceholder:
                    "Search by property name or address...",

                adminPropertySearchAria:
                    "Search for property",

                adminLoadingProperties:
                    "Loading properties...",

                adminNoPropertiesFound:
                    "No properties found",

                adminTryAnotherPropertySearch:
                    "Try another property name or address.",

                adminPropertySingularFound:
                    "{count} property found",

                adminPropertyPluralFound:
                    "{count} properties found",

                adminHistoryComingSoon:
                    "History is coming in a later update.",

                adminSettingsComingSoon:
                    "Settings are coming in a later update.",


                // =================================================
                // ADMIN - PROPERTIES DYNAMIC
                // =================================================

                adminDeactivatedProperties:
                    "Deactivated properties",

                adminDeactivatedPropertiesDescription:
                    "Deactivated properties can be restored within 2 months.",

                adminAuditCreatedBy:
                    "Created by",

                adminAuditUpdatedBy:
                    "Updated by",

                adminAuditDeactivatedBy:
                    "Deactivated by",

                adminAuditRestoredBy:
                    "Restored by",

                adminAuditPermanentlyDeletedBy:
                    "Permanently deleted by",

                adminCouldNotLoadHistory:
                    "Could not load history.",

                adminNoActivityRegistered:
                    "No activity recorded.",

                adminActivityHistory:
                    "Activity / history",

                adminUnknownUser:
                    "Unknown user",

                adminHideHistory:
                    "Hide history",

                adminCouldNotLoadProperties:
                    "Could not load properties.",

                adminNoActiveProperties:
                    "No active properties have been created yet.",

                adminOneFloor:
                    "{count} floor",

                adminMultipleFloors:
                    "{count} floors",

                adminOpen:
                    "Open",

                adminDeactivateProperty:
                    "Deactivate property",

                adminConfirmDeactivateProperty:
                    "Do you want to deactivate the property \"{name}\"?\n\nThe property will not be deleted immediately. It can be restored within 2 months before permanent deletion.",

                adminDeactivating:
                    "Deactivating...",

                adminCouldNotDeactivateProperty:
                    "Could not deactivate the property.",

                adminPropertyCouldNotBeDeactivated:
                    "The property could not be deactivated.",

                adminPropertyDeactivated:
                    "The property was deactivated.",

                adminDeactivated:
                    "Deactivated",

                adminPermanentDeletion:
                    "Permanent deletion",

                adminRestoreProperty:
                    "Restore property",

                adminConfirmRestoreProperty:
                    "Do you want to restore this property?",

                adminRestoring:
                    "Restoring...",

                adminCouldNotRestoreProperty:
                    "Could not restore the property.",

                adminPropertyCouldNotBeRestored:
                    "The property could not be restored. The 2-month restoration period may have expired.",

                adminPropertyRestored:
                    "The property was restored.",

                adminFillAllFields:
                    "Fill in all fields.",

                adminSaving:
                    "Saving...",

                adminAddressAlreadyRegistered:
                    "This address is already registered.",

                adminCouldNotSaveProperty:
                    "Could not save the property.",

                adminPropertySaved:
                    "The property was saved.",


                // =================================================
                // ADMIN - FLOORS
                // =================================================

                adminFloorsPageTitle:
                    "CleanPlan - Floors",

                adminFloorsPageDescription:
                    "Manage floors for the selected property.",

                adminLoadingProperty:
                    "Loading property...",

                adminBackToProperties:
                    "Back to properties",

                adminAddFloor:
                    "Add floor",

                adminAddFloorDescription:
                    "Create a floor for this property.",

                adminFloorNumber:
                    "Floor number",

                adminFloorName:
                    "Floor name",

                adminFloorNamePlaceholder:
                    "For example First floor",

                adminSaveFloor:
                    "Save floor",

                adminRegisteredFloors:
                    "Registered floors",

                adminLoadingFloors:
                    "Loading floors...",

                adminNoPropertySelected:
                    "No property selected.",

                adminCouldNotLoadProperty:
                    "Could not load the property.",

                adminCouldNotLoadFloors:
                    "Could not load floors.",

                adminNoFloorsCreated:
                    "No floors have been created yet.",

                adminFloorNumberDisplay:
                    "Floor {floor}",

                adminEdit:
                    "Edit",

                adminDelete:
                    "Delete",

                adminUpdateFloor:
                    "Update floor",

                adminEditingFloor:
                    "You are editing {name}.",

                adminEnterValidFloorNumber:
                    "Enter a valid floor number.",

                adminEnterFloorName:
                    "Enter a floor name.",

                adminUpdating:
                    "Updating...",

                adminFloorNumberAlreadyRegistered:
                    "This floor number is already registered for the property.",

                adminNoPermissionUpdateFloor:
                    "You do not have permission to update this floor.",

                adminCouldNotUpdateFloor:
                    "Could not update the floor.",

                adminFloorUpdated:
                    "The floor was updated.",

                adminNoPermissionCreateFloor:
                    "You do not have permission to create this floor.",

                adminCouldNotSaveFloor:
                    "Could not save the floor.",

                adminFloorSaved:
                    "The floor was saved.",

                adminConfirmDeleteFloor:
                    "Are you sure you want to delete {name}?",

                adminNoPermissionDeleteFloor:
                    "You do not have permission to delete this floor.",

                adminCouldNotDeleteFloor:
                    "Could not delete the floor.",

                adminFloorDeleted:
                    "The floor was deleted.",


                // =================================================
                // RESIDENT PAGE
                // =================================================

                residentPageTitle:
                    "CleanPlan - My Page",

                residentRole:
                    "RESIDENT",

                residentWelcomeDescription:
                    "Here you can find your property, cleaning schedule and upcoming cleaning weeks.",

                loading:
                    "Loading...",

                residentCleaningEyebrow:
                    "CLEANING SCHEDULE",

                overview:
                    "OVERVIEW",

                residentDashboardTitle:
                    "My overview",

                residentCleaningDescription:
                    "View cleaning weeks, tasks and who is responsible.",

                residentDashboardDescription:
                    "Choose the section you want to open.",

                residentPhotosEyebrow:
                    "PHOTOS",

                residentPhotosHeading:
                    "📷 Photos",

                residentPhotosPageDescription:
                    "Document completed cleaning using your camera.",

                residentPhotoCount:
                    "Photos",

                residentNextCleaningLabel:
                    "Next cleaning",

                residentPropertyCardDescription:
                    "View your registered property, address and floor.",

                residentOpenProperty:
                    "Open property",

                residentPropertyEyebrow:
                    "MY PROPERTY",

                residentCleaningCardDescription:
                    "View cleaning weeks, tasks and who is responsible.",

                residentOpenCleaning:
                    "Open cleaning schedule",

                residentPhotosTitle:
                    "Photos",

                residentPhotosDescription:
                    "Document cleaning with photos from your camera.",

                residentOpenPhotos:
                    "Open photos",

                residentLoadingDescription:
                    "Loading your account and cleaning schedule.",

                propertyAssociation:
                    "Property assignment",

                accountActive:
                    "Your account is active.",

                notAssignedProperty:
                    "You have not been assigned to a property yet",

                notAssignedPropertyDescription:
                    "Your account has been created and is ready to use, but an administrator has not yet assigned you to a property and floor.",

                contactAdministratorProperty:
                    "Contact your administrator if you believe your property assignment should already have been registered.",

                myProperty:
                    "My property",

                registeredPropertyFloor:
                    "Your registered property and floor.",

                active:
                    "Active",

                noCleaningPlanYet:
                    "No cleaning schedule yet",

                noCleaningPlanDescription:
                    "An administrator has not created a cleaning schedule for your floor yet.",

                thisWeek:
                    "THIS WEEK",

                date:
                    "Date",

                responsible:
                    "Responsible",

                time:
                    "Time",

                floor:
                    "Floor",

                thursdayFallbackWarning:
                    "If Friday is not possible, cleaning must be completed on Thursday.",

                viewPreviousUpcomingWeeks:
                    "View previous and upcoming weeks.",

                previous:
                    "Previous",

                next:
                    "Next",

                selectedWeek:
                    "Selected week",

                status:
                    "Status",

                cleaningTasks:
                    "Cleaning tasks",

                noCleaningTasks:
                    "No cleaning tasks have been registered yet.",


                // =================================================
                // DOCUMENTATION / CAMERA
                // =================================================

                documentWork:
                    "Document the work",

                documentWorkDescription:
                    "Take new photos with your camera after cleaning is completed.",

                takePhoto:
                    "Take photo",

                takePhotoWithIcon:
                    "📷 Take photo",

                maxTenPhotos:
                    "Maximum 10 photos",

                maxTenPhotosAlert:
                    "You can add a maximum of 10 photos.",

                photosCount:
                    "Photos ({count}/10)",

                documentationPhotoAlt:
                    "Documentation photo",

                cleaningDocumentationPhoto:
                    "Documentation photo",

                removePhotoAria:
                    "Remove photo",

                deletePhoto:
                    "Delete photo",

                maxPhotosTaken:
                    "✓ Maximum number of photos taken",


                // =================================================
                // CONFIRM AND SIGN
                // =================================================

                confirmAndSign:
                    "Confirm and sign",

                confirmAndSignDescription:
                    "Confirm when all tasks have been completed and documentation has been added.",

                signedBy:
                    "Signed by",

                week:
                    "Week",

                confirmCleaningCompleted:
                    "Confirm and sign completed cleaning",

                couldNotLoadPage:
                    "Could not load the page",


                // =================================================
                // DYNAMIC RESIDENT TEXT
                // =================================================

                welcomeUser:
                    "Welcome, {name}",

                propertyFallbackName:
                    "Property",

                noAddressRegistered:
                    "No address registered",

                floorPrefix:
                    "Floor: {floor}",

                notRegistered:
                    "Not registered",

                floorNumber:
                    "Floor {floor}",

                couldNotFetchPropertyAssociation:
                    "Could not retrieve your property assignment.",

                couldNotFetchCleaningPlan:
                    "Could not retrieve the cleaning schedule.",

                couldNotFetchCleaningTasks:
                    "Could not retrieve the cleaning tasks.",

                couldNotFetchCleaningRotation:
                    "Could not retrieve the cleaning rotation.",

                noActiveCleaningPlan:
                    "No active cleaning schedule has been created yet.",

                notAssigned:
                    "Not assigned",

                scheduled:
                    "Scheduled",

                planned:
                    "Planned",

                previousWeekStatus:
                    "Previous week",

                upcoming:
                    "Upcoming",

                notAvailableYet:
                    "Not available yet",

                notYetAvailable:
                    "Not available yet",

                open:
                    "Open",

                deadlinePassed:
                    "Deadline passed",

                completed:
                    "Completed ✓",

                notCompleted:
                    "Not completed",

                cleaningWeekHeading:
                    "Cleaning • Week {week}",

                weekLabel:
                    "Week {week}",

                zeroTasks:
                    "0 tasks",

                oneTask:
                    "{count} task",

                multipleTasks:
                    "{count} tasks",

                cleaningTask:
                    "Cleaning task",

                tasksCreatedByAdministrator:
                    "The tasks were created by an administrator.",

                tasksVisibleOnlyResponsibleCanComplete:
                    "You can view the tasks, but only the resident responsible for this week can complete them.",

                onlyNameCanComplete:
                    "Only {name} can complete this week.",

                onlyResponsibleCanConfirm:
                    "🔒 Only the resident responsible for this week can confirm the cleaning.",

                onlyResponsibleResidentCanComplete:
                    "Only the responsible resident can complete this week.",

                responsibleOnlyForWeek:
                    "🔒 Only the resident responsible for this week can complete the cleaning.",

                notActiveCleaningWeek:
                    "This is not the active cleaning week.",

                tasksOnlyCurrentWeek:
                    "Tasks can only be completed during the current week.",

                onlyCurrentWeekCanBeCompleted:
                    "Only the current cleaning week can be completed.",

                selectCurrentWeekToClean:
                    "🔒 Select the current week to complete cleaning.",

                cleaningAvailableThursday:
                    "Cleaning becomes available on Thursday.",

                notAvailableThursdayFriday:
                    "Not available yet. Cleaning can be registered on Thursday or Friday.",

                notYetAvailableLocked:
                    "🔒 Not available yet. Cleaning can be registered on Thursday or Friday.",

                confirmationOpensThursday:
                    "🔒 Confirmation becomes available on Thursday.",

                deadlineExpiredForWeek:
                    "The deadline for this week has expired.",

                cleaningCannotBeRegistered:
                    "Cleaning can no longer be registered for this week.",

                deadlineExpiredLocked:
                    "🔒 The deadline has expired.",

                responsibleThisWeekCheckTasks:
                    "You are responsible this week. Check off each task as you complete it.",

                responsibleForThisWeek:
                    "You are responsible for this week.",

                completeTasksAndPhotoBeforeSign:
                    "Complete all tasks and take at least one new photo before signing.",

                cleaningAlreadySigned:
                    "The cleaning has already been signed.",

                couldNotSaveTaskCompletion:
                    "Could not save the task as completed.",

                couldNotRemoveTaskCompletion:
                    "Could not remove the task completion.",

                completionReadyForSupabase:
                    "All tasks are completed and the documentation is ready.",

                unexpectedResidentPageError:
                    "An unexpected error occurred on the resident page.",

                errorOccurred:
                    "An error occurred.",


                // =================================================
                // CLEANING HISTORY
                // =================================================

                cleaningHistory:
                    "History",

                cleaningHistoryEyebrow:
                    "History",

                cleaningHistoryDescription:
                    "View previous cleaning weeks and documentation for your property and floor.",

                closeCleaningHistory:
                    "Close history",

                loadingCleaningHistory:
                    "Loading cleaning history...",

                noCleaningHistory:
                    "No history yet",

                noCleaningHistoryDescription:
                    "Previous cleaning weeks will appear here when they become available.",

                cleaningHistoryResponsible:
                    "Responsible",

                cleaningHistorySignedBy:
                    "Signed by",

                cleaningHistorySignedAt:
                    "Signed",

                cleaningHistoryDocumentation:
                    "Documentation",

                cleaningHistoryNoDocumentation:
                    "No documentation photos",

                cleaningHistoryWeek:
                    "Week",


                // =================================================
                // ADMIN - RESIDENTS
                // =================================================

                adminResidentsPageTitle:
                    "CleanPlan - Residents",

                adminResidentsPageDescription:
                    "Manage residents and their assignments to properties and floors.",

                adminAddResident:
                    "Add resident",

                adminAddResidentDescription:
                    "Assign an existing user profile to a property and floor.",

                adminResidentProfile:
                    "User profile",

                adminSelectResidentProfile:
                    "Select user profile",

                adminProperty:
                    "Property",

                adminSelectProperty:
                    "Select property",

                adminFloor:
                    "Floor",

                adminSelectPropertyFirst:
                    "Select a property first",

                adminSelectFloor:
                    "Select floor",

                adminCreateResident:
                    "Create resident",

                adminRegisteredResidents:
                    "Registered residents",

                adminResidentsAccessDescription:
                    "Residents you have permission to manage.",

                adminShowResidents:
                    "Show residents",

                adminHideResidents:
                    "Hide residents",

                adminResidentSearchPlaceholder:
                    "Search by name, email, property or floor...",

                adminResidentSearchAria:
                    "Search for resident",

                adminResidentSingularFound:
                    "{count} resident found",

                adminResidentPluralFound:
                    "{count} residents found",

                adminLoadingResidents:
                    "Loading residents...",

                adminNoResidentsFound:
                    "No residents found",

                adminTryAnotherResidentSearch:
                    "Try another name, email, property or floor.",

                adminLoadingUserProfiles:
                    "Loading user profiles...",

                adminCouldNotLoadUserProfiles:
                    "Could not load user profiles",

                adminNoActiveResidentUsers:
                    "No active resident users",

                adminNoPropertiesAvailable:
                    "No properties available",

                adminNoFloorsAvailable:
                    "No floors available",

                adminNoResidentsRegistered:
                    "No residents have been registered yet.",

                adminCouldNotLoadResidents:
                    "Could not load residents.",

                adminUnknownProperty:
                    "Unknown property",

                adminNoFloor:
                    "No floor",

                adminSelectProfilePropertyFloor:
                    "Select a user profile, property and floor.",

                adminCreatingResident:
                    "Creating...",

                adminResidentAlreadyRegistered:
                    "This user is already registered.",

                adminNoPermissionCreateResident:
                    "You do not have permission to create this resident.",

                adminCouldNotCreateResident:
                    "Could not create the resident.",

                adminResidentCreated:
                    "The resident was created.",


                // =================================================
                // ADMIN - CLEANING PLAN
                // =================================================

                adminCleaningPlanPageTitle:
                    "CleanPlan - Cleaning Schedule",

                adminCleaningPlanAdminTitle:
                    "Cleaning Schedule (Admin)",

                adminCleaningPlanPageDescription:
                    "Create and manage tasks for the cleaning schedule.",

                adminCleaningTasksVisibilityInfo:
                    "The tasks you create here are visible to all residents living on this floor.",

                adminAddNewCleaningTask:
                    "Add new task",

                adminTask:
                    "Task",

                adminTaskPlaceholder:
                    "Enter the task here...",

                adminDescription:
                    "Description",

                adminOptional:
                    "(optional)",

                adminTaskDescriptionPlaceholder:
                    "Any additional information...",

                adminOrder:
                    "Order",

                adminLowerNumbersFirst:
                    "Lower numbers appear first.",

                adminAddTask:
                    "Add task",

                adminCancelEditing:
                    "Cancel editing",

                adminCleaningTasks:
                    "Cleaning tasks",

                adminActions:
                    "Actions",

                adminNoTasksForFloor:
                    "No tasks have been created for this floor yet.",

                adminDragDropTaskInfo:
                    "Drag and drop to change the order of tasks.",

                adminDragToReorder:
                    "Drag to reorder",

                adminDragTaskAria:
                    "Drag the task to change its order",

                adminCouldNotLoadCleaningPlan:
                    "Could not load the cleaning schedule.",

                adminCouldNotCreateCleaningPlan:
                    "Could not create the cleaning schedule.",

                adminCouldNotLoadTasks:
                    "Could not load the tasks.",

                adminSavingNewOrder:
                    "Saving new order...",

                adminCouldNotSaveNewOrder:
                    "Could not save the new order.",

                adminOrderSaved:
                    "The order was saved.",

                adminEditTask:
                    "Edit task",

                adminSaveChanges:
                    "Save changes",

                adminSavingChanges:
                    "Saving changes...",

                adminAddingTask:
                    "Adding...",

                adminSelectPropertyAndFloorFirst:
                    "Select a property and floor first.",

                adminEnterTask:
                    "Enter a task.",

                adminTaskOrderMinimum:
                    "The order must be 1 or higher.",

                adminCouldNotTranslateCleaningTask:
                    "Could not translate the cleaning task.",

                adminInvalidTranslationResponse:
                    "Invalid response from the translation service.",

                adminCouldNotUpdateTaskOrder:
                    "Could not update the task order.",

                adminTaskAlreadyExistsOnFloor:
                    "This task already exists on this floor.",

                adminNoPermissionCreateTask:
                    "You do not have permission to create this task.",

                adminCouldNotCreateTask:
                    "Could not create the task.",

                adminCouldNotConnectTaskToPlan:
                    "Could not connect the task to the cleaning schedule.",

                adminTaskCreatedTranslationFailed:
                    "The task was created, but its translation could not be saved.",

                adminTaskAdded:
                    "The task was added.",

                adminCouldNotFindTask:
                    "Could not find the task.",

                adminCouldNotChangeTaskOrder:
                    "Could not change the task order.",

                adminCouldNotSaveTaskOrder:
                    "Could not save the task order.",

                adminTaskAlreadyExists:
                    "This task already exists.",

                adminNoPermissionUpdateTask:
                    "You do not have permission to update this task.",

                adminCouldNotUpdateTask:
                    "Could not update the task.",

                adminTaskUpdatedTranslationFailed:
                    "The task was updated, but its translation could not be updated.",

                adminTaskUpdated:
                    "The task was updated.",

                adminConfirmDeleteTask:
                    "Do you want to delete the task \"{name}\"?",

                adminNoPermissionDeleteTask:
                    "You do not have permission to delete this task.",

                adminCouldNotDeleteTask:
                    "Could not delete the task.",

                adminTaskDeleted:
                    "The task was deleted.",


                // =================================================
                // ADMIN - USERS
                // =================================================

                adminUsersPageTitle:
                    "CleanPlan - Users",

                adminUsersPageDescription:
                    "Create and manage users and roles.",

                adminCreateUser:
                    "Create user",

                adminCreateUserDescription:
                    "Create a new user for CleanPlan. The user will receive a secure email link to set their own password.",

                adminNameLabel:
                    "Name",

                adminNamePlaceholder:
                    "For example John Smith",

                adminRole:
                    "Role",

                adminSelectRole:
                    "Select role",

                adminRegisteredUsers:
                    "Registered users",

                adminUsersAccessDescription:
                    "User profiles you have permission to manage.",

                adminShowUsers:
                    "Show users",

                adminHideUsers:
                    "Hide users",

                adminUserSearchPlaceholder:
                    "Search by name, email, role or status...",

                adminUserSearchAria:
                    "Search for user",

                adminUserSingularFound:
                    "{count} user found",

                adminUserPluralFound:
                    "{count} users found",

                adminLoadingUsers:
                    "Loading users...",

                adminNoUsersFound:
                    "No users found",

                adminTryAnotherUserSearch:
                    "Try another name, email, role or status.",

                adminCouldNotVerifyUserRole:
                    "Could not verify the user role.",

                adminFillAllUserFields:
                    "Fill in all fields.",

                adminEnterValidEmail:
                    "Enter a valid email address.",

                adminCanOnlyCreateResident:
                    "Admin can only create Resident users.",

                superadminCanOnlyCreateAdminResident:
                    "Superadmin can only create Admin or Resident users.",

                adminCreatingUser:
                    "Creating...",

                adminCreatingUserMessage:
                    "Creating user...",

                adminCouldNotCreateUser:
                    "Could not create the user.",

                adminUserCreatedPasswordLinkSent:
                    "The user was created. A secure password setup link has been sent to their email address.",

                adminCreateUserUnexpectedError:
                    "An error occurred while creating the user.",

                adminNoUsersRegistered:
                    "No users registered.",

                adminCouldNotLoadUsers:
                    "Could not load users.",

                adminRoleSuperadmin:
                    "Superadmin",

                adminRoleAdmin:
                    "Admin",

                adminRoleResident:
                    "Resident",

                adminUnknown:
                    "Unknown"

            }

        };


        // ========================================================
        // LANGUAGE STORAGE
        // ========================================================

        const LANGUAGE_STORAGE_KEY =
            "cleanplan_language";


        // ========================================================
        // GET SAVED LANGUAGE
        // ========================================================

        function getSavedLanguage() {

            const savedLanguage =
                localStorage.getItem(
                    LANGUAGE_STORAGE_KEY
                );

            const supportedLanguage =
                languages.some(
                    language =>
                        language.code === savedLanguage
                );

            return supportedLanguage
                ? savedLanguage
                : "no";

        }


        // ========================================================
        // CURRENT LANGUAGE
        // ========================================================

        let currentLanguage =
            getSavedLanguage();


        // ========================================================
        // GET TRANSLATION
        // ========================================================

        function getTranslation(
            key,
            replacements = {}
        ) {

            const languageDictionary =
                translations[currentLanguage] ||
                translations.no;

            const norwegianDictionary =
                translations.no;

            let translatedText =
                languageDictionary[key] ??
                norwegianDictionary[key] ??
                key;

            if (
                typeof translatedText !== "string"
            ) {

                return translatedText;

            }

            for (
                const [placeholder, value]
                of Object.entries(replacements)
                ) {

                translatedText =
                    translatedText.replaceAll(
                        `{${placeholder}}`,
                        String(value)
                    );

            }

            return translatedText;

        }


        // ========================================================
        // GET CURRENT LANGUAGE
        // ========================================================

        function getLanguage() {

            return currentLanguage;

        }


        // ========================================================
        // APPLY TEXT TRANSLATIONS
        // ========================================================

        function applyTranslations() {

            const elements =
                document.querySelectorAll(
                    "[data-i18n]"
                );

            elements.forEach(
                function (element) {

                    const translationKey =
                        element.getAttribute(
                            "data-i18n"
                        );

                    if (!translationKey) {

                        return;

                    }

                    element.textContent =
                        getTranslation(
                            translationKey
                        );

                }
            );


            // ================================================
            // PLACEHOLDER TRANSLATIONS
            // ================================================

            const placeholderElements =
                document.querySelectorAll(
                    "[data-i18n-placeholder]"
                );

            placeholderElements.forEach(
                function (element) {

                    const translationKey =
                        element.getAttribute(
                            "data-i18n-placeholder"
                        );

                    if (!translationKey) {

                        return;

                    }

                    element.setAttribute(
                        "placeholder",
                        getTranslation(
                            translationKey
                        )
                    );

                }
            );


            // ================================================
            // ARIA LABEL TRANSLATIONS
            // ================================================

            const ariaElements =
                document.querySelectorAll(
                    "[data-i18n-aria-label]"
                );

            ariaElements.forEach(
                function (element) {

                    const translationKey =
                        element.getAttribute(
                            "data-i18n-aria-label"
                        );

                    if (!translationKey) {

                        return;

                    }

                    element.setAttribute(
                        "aria-label",
                        getTranslation(
                            translationKey
                        )
                    );

                }
            );


            // ================================================
            // DOCUMENT LANGUAGE
            // ================================================

            document.documentElement.lang =
                currentLanguage;

        }


        // ========================================================
        // SET LANGUAGE
        // ========================================================

        function setLanguage(
            languageCode
        ) {

            const isSupported =
                languages.some(
                    language =>
                        language.code === languageCode
                );

            if (!isSupported) {

                return;

            }

            currentLanguage =
                languageCode;

            localStorage.setItem(
                LANGUAGE_STORAGE_KEY,
                languageCode
            );

            applyTranslations();

            window.dispatchEvent(
                new CustomEvent(
                    "cleanplan:languagechange",
                    {
                        detail: {
                            language: languageCode
                        }
                    }
                )
            );

        }


        // ========================================================
        // LANGUAGE SELECTOR
        // ========================================================

        function initializeLanguageSelector() {

            const languageSwitcher =
                document.getElementById(
                    "languageSwitcher"
                );

            const currentButton =
                document.getElementById(
                    "languageCurrentButton"
                );

            const languageMenu =
                document.getElementById(
                    "languageMenu"
                );

            const currentFlag =
                document.getElementById(
                    "currentLanguageFlag"
                );

            const currentCode =
                document.getElementById(
                    "currentLanguageCode"
                );


            // ====================================================
            // UPDATE CURRENT LANGUAGE DISPLAY
            // ====================================================

            function updateCurrentLanguage() {

                const selectedLanguage =
                    languages.find(
                        language =>
                            language.code === currentLanguage
                    );

                if (!selectedLanguage) {
                    return;
                }

                if (currentFlag) {

                    currentFlag.textContent =
                        selectedLanguage.flag;

                }

                if (currentCode) {

                    currentCode.textContent =
                        selectedLanguage.shortCode;

                }

                document.querySelectorAll(
                    ".language-option"
                ).forEach(
                    function (option) {

                        option.setAttribute(
                            "aria-selected",
                            String(
                                option.dataset.language ===
                                currentLanguage
                            )
                        );

                    }
                );

            }


            // ====================================================
            // CUSTOM LANGUAGE MENU
            // ====================================================

            if (
                languageSwitcher &&
                currentButton &&
                languageMenu
            ) {

                function closeLanguageMenu() {

                    languageMenu.hidden = true;

                    currentButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


                currentButton.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();

                        const shouldOpen =
                            languageMenu.hidden;

                        languageMenu.hidden =
                            !shouldOpen;

                        currentButton.setAttribute(
                            "aria-expanded",
                            String(shouldOpen)
                        );

                    }
                );


                languageMenu.querySelectorAll(
                    ".language-option"
                ).forEach(
                    function (option) {

                        option.addEventListener(
                            "click",
                            function () {

                                const languageCode =
                                    option.dataset.language;

                                setLanguage(languageCode);

                                updateCurrentLanguage();

                                closeLanguageMenu();

                            }
                        );

                    }
                );


                document.addEventListener(
                    "click",
                    function (event) {

                        if (
                            !languageSwitcher.contains(
                                event.target
                            )
                        ) {

                            closeLanguageMenu();

                        }

                    }
                );


                document.addEventListener(
                    "keydown",
                    function (event) {

                        if (event.key === "Escape") {

                            closeLanguageMenu();

                        }

                    }
                );

            }


            // ====================================================
            // STANDARD SELECT ELEMENTS
            // ====================================================

            document.querySelectorAll(
                "#languageSelect, [data-language-select]"
            ).forEach(
                function (selector) {

                    selector.value =
                        currentLanguage;

                    selector.addEventListener(
                        "change",
                        function () {

                            setLanguage(
                                selector.value
                            );

                        }
                    );

                }
            );


            // ====================================================
            // REFRESH WHEN LANGUAGE CHANGES
            // ====================================================

            window.addEventListener(
                "cleanplan:languagechange",
                updateCurrentLanguage
            );


            updateCurrentLanguage();

        }



        // ========================================================
        // UPDATE LANGUAGE SELECTORS
        // ========================================================

        function updateLanguageSelectors() {

            const languageSelectors =
                document.querySelectorAll(
                    "#languageSelect, [data-language-select]"
                );

            languageSelectors.forEach(
                function (selector) {

                    selector.value =
                        currentLanguage;

                }
            );

        }


        // ========================================================
        // SYNC LANGUAGE SELECTORS
        // ========================================================

        window.addEventListener(
            "cleanplan:languagechange",
            function () {

                updateLanguageSelectors();

            }
        );


        // ========================================================
        // EXPOSE TRANSLATION FUNCTIONS
        // ========================================================

        window.CleanPlanI18n = {

            t: getTranslation,

            getLanguage: getLanguage,

            setLanguage: setLanguage,

            applyTranslations: applyTranslations,

            languages: languages

        };


        // ========================================================
        // INITIALIZE LANGUAGE SYSTEM
        // ========================================================

        initializeLanguageSelector();

        applyTranslations();


        // ========================================================
        // LANGUAGE SYSTEM READY
        // ========================================================

        window.dispatchEvent(
            new CustomEvent(
                "cleanplan:languageReady",
                {
                    detail: {
                        language: currentLanguage
                    }
                }
            )
        );


    }
);


