// ============================================================
// CLEANING APP
// LANGUAGE SELECTOR
// ============================================================


// ============================================================
// ELEMENTS
// ============================================================

const languageButton =
    document.getElementById(
        "languageButton"
    );

const languageModal =
    document.getElementById(
        "languageModal"
    );

const languageSearchInput =
    document.getElementById(
        "languageSearchInput"
    );

const clearLanguageSearchButton =
    document.getElementById(
        "clearLanguageSearchButton"
    );

const languageList =
    document.getElementById(
        "languageList"
    );

const languageResultText =
    document.getElementById(
        "languageResultText"
    );

const languageSearchEmpty =
    document.getElementById(
        "languageSearchEmpty"
    );

const selectedLanguageName =
    document.getElementById(
        "selectedLanguageName"
    );

const languageSelector =
    document.querySelector(
        ".language-selector"
    );


// ============================================================
// LANGUAGES
// ============================================================

const languages = [

    {
        code: "no",
        shortCode: "NO",
        name: "Norsk",
        nativeName: "Norsk",
        flag: "🇳🇴"
    },

    {
        code: "en",
        shortCode: "EN",
        name: "English",
        nativeName: "English",
        flag: "🇬🇧"
    },

    {
        code: "sv",
        shortCode: "SV",
        name: "Svenska",
        nativeName: "Svenska",
        flag: "🇸🇪"
    },

    {
        code: "da",
        shortCode: "DA",
        name: "Dansk",
        nativeName: "Dansk",
        flag: "🇩🇰"
    },

    {
        code: "de",
        shortCode: "DE",
        name: "Deutsch",
        nativeName: "Deutsch",
        flag: "🇩🇪"
    },

    {
        code: "fr",
        shortCode: "FR",
        name: "Français",
        nativeName: "Français",
        flag: "🇫🇷"
    },

    {
        code: "es",
        shortCode: "ES",
        name: "Español",
        nativeName: "Español",
        flag: "🇪🇸"
    },

    {
        code: "it",
        shortCode: "IT",
        name: "Italiano",
        nativeName: "Italiano",
        flag: "🇮🇹"
    },

    {
        code: "pt",
        shortCode: "PT",
        name: "Português",
        nativeName: "Português",
        flag: "🇵🇹"
    },

    {
        code: "pl",
        shortCode: "PL",
        name: "Polski",
        nativeName: "Polski",
        flag: "🇵🇱"
    },

    {
        code: "ro",
        shortCode: "RO",
        name: "Română",
        nativeName: "Română",
        flag: "🇷🇴"
    },

    {
        code: "hu",
        shortCode: "HU",
        name: "Magyar",
        nativeName: "Magyar",
        flag: "🇭🇺"
    },

    {
        code: "bg",
        shortCode: "BG",
        name: "Български",
        nativeName: "Български",
        flag: "🇧🇬"
    },

    {
        code: "el",
        shortCode: "EL",
        name: "Ελληνικά",
        nativeName: "Ελληνικά",
        flag: "🇬🇷"
    },

    {
        code: "hr",
        shortCode: "HR",
        name: "Hrvatski",
        nativeName: "Hrvatski",
        flag: "🇭🇷"
    },

    {
        code: "sk",
        shortCode: "SK",
        name: "Slovenčina",
        nativeName: "Slovenčina",
        flag: "🇸🇰"
    },

    {
        code: "cs",
        shortCode: "CS",
        name: "Čeština",
        nativeName: "Čeština",
        flag: "🇨🇿"
    },

    {
        code: "uk",
        shortCode: "UK",
        name: "Українська",
        nativeName: "Українська",
        flag: "🇺🇦"
    },

    {
        code: "ru",
        shortCode: "RU",
        name: "Русский",
        nativeName: "Русский",
        flag: "🇷🇺"
    },

    {
        code: "tr",
        shortCode: "TR",
        name: "Türkçe",
        nativeName: "Türkçe",
        flag: "🇹🇷"
    },

    {
        code: "ar",
        shortCode: "AR",
        name: "Arabic",
        nativeName: "العربية",
        flag: "🇸🇦"
    },

    {
        code: "am",
        shortCode: "AM",
        name: "Amharic",
        nativeName: "አማርኛ",
        flag: "🇪🇹"
    },

    {
        code: "ti",
        shortCode: "TI",
        name: "Tigrinya",
        nativeName: "ትግርኛ",
        flag: "🇪🇷"
    },

    {
        code: "hi",
        shortCode: "HI",
        name: "Hindi",
        nativeName: "हिन्दी",
        flag: "🇮🇳"
    },

    {
        code: "bn",
        shortCode: "BN",
        name: "Bengali",
        nativeName: "বাংলা",
        flag: "🇧🇩"
    },

    {
        code: "ur",
        shortCode: "UR",
        name: "Urdu",
        nativeName: "اردو",
        flag: "🇵🇰"
    },

    {
        code: "zh",
        shortCode: "ZH",
        name: "Chinese",
        nativeName: "中文",
        flag: "🇨🇳"
    },

    {
        code: "ja",
        shortCode: "JA",
        name: "Japanese",
        nativeName: "日本語",
        flag: "🇯🇵"
    },

    {
        code: "ko",
        shortCode: "KO",
        name: "Korean",
        nativeName: "한국어",
        flag: "🇰🇷"
    }

];


// ============================================================
// CURRENT LANGUAGE
// ============================================================

let currentLanguageCode =
    localStorage.getItem(
        "cleaningAppLanguage"
    ) || "no";


// ============================================================
// GET LANGUAGE
// ============================================================

function getLanguageByCode(
    code
) {

    return languages.find(
        function (
            language
        ) {

            return (
                language.code ===
                code
            );

        }
    );

}


// ============================================================
// UPDATE LANGUAGE BUTTON
// ============================================================

function updateLanguageButton() {

    const language =
        getLanguageByCode(
            currentLanguageCode
        );


    if (!language) {
        return;
    }


    if (selectedLanguageName) {

        selectedLanguageName.textContent =
            language.shortCode;

    }


    document.documentElement.lang =
        language.code;

}


// ============================================================
// OPEN DROPDOWN
// ============================================================

function openLanguageModal() {

    if (!languageModal) {
        return;
    }


    languageModal.hidden =
        false;


    if (languageButton) {

        languageButton.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    renderLanguages(
        languageSearchInput
            ? languageSearchInput.value
            : ""
    );


    window.setTimeout(
        function () {

            if (languageSearchInput) {

                languageSearchInput.focus();

            }

        },
        20
    );

}


// ============================================================
// CLOSE DROPDOWN
// ============================================================

function closeLanguageModal() {

    if (!languageModal) {
        return;
    }


    languageModal.hidden =
        true;


    if (languageButton) {

        languageButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


// ============================================================
// TOGGLE DROPDOWN
// ============================================================

function toggleLanguageModal() {

    if (!languageModal) {
        return;
    }


    if (languageModal.hidden) {

        openLanguageModal();

        return;

    }


    closeLanguageModal();

}


// ============================================================
// CREATE LANGUAGE ROW
// ============================================================

function createLanguageItem(
    language
) {

    const button =
        document.createElement(
            "button"
        );


    button.type =
        "button";


    button.className =
        "language-item";


    button.dataset.languageCode =
        language.code;


    button.setAttribute(
        "role",
        "option"
    );


    const isSelected =
        language.code ===
        currentLanguageCode;


    button.setAttribute(
        "aria-selected",
        isSelected
            ? "true"
            : "false"
    );


    if (isSelected) {

        button.classList.add(
            "active"
        );

    }


    const main =
        document.createElement(
            "span"
        );


    main.className =
        "language-item-main";


    const icon =
        document.createElement(
            "span"
        );


    icon.className =
        "language-item-icon";


    icon.textContent =
        language.flag;


    const text =
        document.createElement(
            "span"
        );


    text.className =
        "language-item-text";


    const name =
        document.createElement(
            "span"
        );


    name.className =
        "language-item-name";


    name.textContent =
        language.shortCode;


    text.appendChild(
        name
    );


    main.appendChild(
        icon
    );


    main.appendChild(
        text
    );


    button.appendChild(
        main
    );


    if (isSelected) {

        const check =
            document.createElement(
                "span"
            );


        check.className =
            "language-item-check";


        check.textContent =
            "✓";


        button.appendChild(
            check
        );

    }


    return button;

}


// ============================================================
// FILTER LANGUAGES
// ============================================================

function getFilteredLanguages(
    searchValue
) {

    const query =
        searchValue
            .trim()
            .toLocaleLowerCase();


    if (!query) {

        return languages;

    }


    return languages.filter(
        function (
            language
        ) {

            const values = [

                language.code,
                language.shortCode,
                language.name,
                language.nativeName

            ];


            return values.some(
                function (
                    value
                ) {

                    return value
                        .toLocaleLowerCase()
                        .includes(
                            query
                        );

                }
            );

        }
    );

}


// ============================================================
// RENDER LANGUAGES
// ============================================================

function renderLanguages(
    searchValue = ""
) {

    if (!languageList) {
        return;
    }


    const filteredLanguages =
        getFilteredLanguages(
            searchValue
        );


    languageList.innerHTML =
        "";


    if (languageResultText) {

        languageResultText.textContent =
            filteredLanguages.length +
            " språk";

    }


    if (
        filteredLanguages.length === 0
    ) {

        languageList.hidden =
            true;


        if (languageSearchEmpty) {

            languageSearchEmpty.hidden =
                false;

        }


        return;

    }


    languageList.hidden =
        false;


    if (languageSearchEmpty) {

        languageSearchEmpty.hidden =
            true;

    }


    filteredLanguages.forEach(
        function (
            language
        ) {

            languageList.appendChild(
                createLanguageItem(
                    language
                )
            );

        }
    );

}


// ============================================================
// SELECT LANGUAGE
// ============================================================

function selectLanguage(
    languageCode
) {

    const language =
        getLanguageByCode(
            languageCode
        );


    if (!language) {

        console.error(
            "Unknown language:",
            languageCode
        );

        return;

    }


    currentLanguageCode =
        language.code;


    localStorage.setItem(
        "cleaningAppLanguage",
        language.code
    );


    updateLanguageButton();


    if (languageSearchInput) {

        languageSearchInput.value =
            "";

    }


    if (clearLanguageSearchButton) {

        clearLanguageSearchButton.hidden =
            true;

    }


    renderLanguages();


    closeLanguageModal();

}


// ============================================================
// LANGUAGE BUTTON
// ============================================================

if (languageButton) {

    languageButton.addEventListener(
        "click",
        function (
            event
        ) {

            event.preventDefault();

            event.stopPropagation();


            toggleLanguageModal();

        }
    );

}


// ============================================================
// LANGUAGE LIST CLICK
// EVENT DELEGATION
// ============================================================

if (languageList) {

    languageList.addEventListener(
        "click",
        function (
            event
        ) {

            const languageItem =
                event.target.closest(
                    ".language-item"
                );


            if (!languageItem) {
                return;
            }


            event.preventDefault();

            event.stopPropagation();


            const languageCode =
                languageItem.dataset
                    .languageCode;


            if (!languageCode) {
                return;
            }


            selectLanguage(
                languageCode
            );

        }
    );

}


// ============================================================
// SEARCH
// ============================================================

if (languageSearchInput) {

    languageSearchInput.addEventListener(
        "input",
        function () {

            const value =
                languageSearchInput.value;


            renderLanguages(
                value
            );


            if (clearLanguageSearchButton) {

                clearLanguageSearchButton.hidden =
                    value.trim().length === 0;

            }

        }
    );

}


// ============================================================
// CLEAR SEARCH
// ============================================================

if (clearLanguageSearchButton) {

    clearLanguageSearchButton.addEventListener(
        "click",
        function (
            event
        ) {

            event.preventDefault();

            event.stopPropagation();


            if (!languageSearchInput) {
                return;
            }


            languageSearchInput.value =
                "";


            clearLanguageSearchButton.hidden =
                true;


            renderLanguages();


            languageSearchInput.focus();

        }
    );

}


// ============================================================
// CLICK INSIDE SELECTOR
// ============================================================

if (languageSelector) {

    languageSelector.addEventListener(
        "click",
        function (
            event
        ) {

            event.stopPropagation();

        }
    );

}


// ============================================================
// CLICK OUTSIDE
// ============================================================

document.addEventListener(
    "click",
    function (
        event
    ) {

        if (
            languageSelector &&
            languageSelector.contains(
                event.target
            )
        ) {

            return;

        }


        closeLanguageModal();

    }
);


// ============================================================
// ESCAPE
// ============================================================

document.addEventListener(
    "keydown",
    function (
        event
    ) {

        if (
            event.key !==
            "Escape"
        ) {

            return;

        }


        closeLanguageModal();

    }
);


// ============================================================
// START
// ============================================================

updateLanguageButton();

renderLanguages();