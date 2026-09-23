/* =========================================================
   DIGITAL HORIZONS
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       LANGUAGE MENU
    ===================================================== */

    const languageButton =
        document.getElementById("languageButton");


    const languageMenu =
        document.getElementById("languageMenu");


    /* FIX:
       languageButtons was previously used
       without being declared.
    */

    const languageButtons =
        document.querySelectorAll(
            ".language-menu button[data-lang]"
        );


    if (
        languageButton &&
        languageMenu
    ) {


        languageButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                const opened =
                    languageMenu.classList.toggle(
                        "open"
                    );


                languageButton.setAttribute(
                    "aria-expanded",
                    opened
                        ? "true"
                        : "false"
                );

            }
        );


        document.addEventListener(
            "click",
            (event) => {

                if (
                    !languageMenu.contains(
                        event.target
                    ) &&
                    !languageButton.contains(
                        event.target
                    )
                ) {

                    languageMenu.classList.remove(
                        "open"
                    );


                    languageButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    }



    /* =====================================================
       LANGUAGE SELECTION
       Google Translate
    ===================================================== */

    const supportedLanguages = [

        "de",
        "en",
        "fr",
        "es",
        "it",
        "pt",
        "nl",
        "da",
        "sv",
        "no",
        "fi",
        "pl",
        "cs",
        "sk",
        "hu",
        "ro",
        "bg",
        "el",
        "tr",
        "ru",
        "uk",
        "ar",
        "he",
        "fa",
        "hi",
        "bn",
        "ur",
        "zh-CN",
        "ja",
        "ko",
        "vi",
        "th",
        "id"

    ];


    window.googleTranslateElementInit =
        function () {


            if (
                !window.google ||
                !google.translate
            ) {

                return;

            }


            new google.translate.TranslateElement(

                {

                    pageLanguage: "de",

                    includedLanguages:
                        supportedLanguages.join(","),

                    autoDisplay: false

                },

                "google_translate_element"

            );

        };



    const googleScript =
        document.createElement(
            "script"
        );


    googleScript.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";


    googleScript.async = true;


    document.head.appendChild(
        googleScript
    );



    function applyLanguage(lang) {


        document.documentElement.lang =
            lang;



        if (
            [
                "ar",
                "he",
                "fa",
                "ur"
            ].includes(lang)
        ) {

            document.documentElement.dir =
                "rtl";

        } else {

            document.documentElement.dir =
                "ltr";

        }



        const selectLanguage =
            () => {


                const combo =
                    document.querySelector(
                        ".goog-te-combo"
                    );


                if (!combo) {

                    return false;

                }


                combo.value =
                    lang;


                combo.dispatchEvent(
                    new Event("change")
                );


                return true;

            };



        /* German = original language */

        if (
            lang === "de"
        ) {


            const combo =
                document.querySelector(
                    ".goog-te-combo"
                );


            if (combo) {

                combo.value =
                    "de";


                combo.dispatchEvent(
                    new Event("change")
                );

            } else {

                window.location.reload();

            }


            return;

        }



        if (
            selectLanguage()
        ) {

            return;

        }



        let attempts = 0;


        const timer =
            setInterval(
                () => {


                    attempts++;


                    if (
                        selectLanguage() ||
                        attempts >= 40
                    ) {

                        clearInterval(
                            timer
                        );

                    }

                },
                250
            );

    }



    /* =====================================================
       LANGUAGE BUTTONS
    ===================================================== */

    languageButtons.forEach(
        (button) => {


            button.addEventListener(
                "click",
                () => {


                    const lang =
                        button.dataset.lang;


                    const languageName =
                        button.textContent.trim();



                    if (
                        languageButton
                    ) {

                        languageButton.innerHTML =
                            `${languageName} <span>▾</span>`;

                    }



                    if (
                        languageMenu
                    ) {

                        languageMenu.classList.remove(
                            "open"
                        );


                        languageButton?.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }



                    if (
                        supportedLanguages.includes(
                            lang
                        )
                    ) {

                        applyLanguage(
                            lang
                        );

                    }

                }
            );

        }
    );



    /* =====================================================
       CONTACT WORD COUNTER
    ===================================================== */

    const message =
        document.getElementById(
            "message"
        );


    const wordCount =
        document.getElementById(
            "wordCount"
        );



    if (
        message &&
        wordCount
    ) {


        message.addEventListener(
            "input",
            () => {


                let text =
                    message.value.trim();


                let words =
                    text
                        ? text.split(/\s+/).length
                        : 0;



                /* Maximum 500 words */

                if (
                    words > 500
                ) {


                    const limitedWords =
                        text
                            .split(/\s+/)
                            .slice(0, 500)
                            .join(" ");


                    message.value =
                        limitedWords;


                    words =
                        500;

                }



                wordCount.textContent =
                    words;

            }
        );

    }



    /* =====================================================
       CONTACT FORM
       
       IMPORTANT:
       GitHub Pages is static hosting.
       Therefore mailto: is used here.
       
       The visitor's email application will open
       with both company addresses.
    ===================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    const successModal =
        document.getElementById(
            "successModal"
        );



    if (
        contactForm
    ) {


        contactForm.addEventListener(
            "submit",
            (event) => {


                event.preventDefault();



                const subjectElement =
                    document.getElementById(
                        "subject"
                    );


                const messageElement =
                    document.getElementById(
                        "message"
                    );


                const emailElement =
                    document.getElementById(
                        "email"
                    );



                const subject =
                    subjectElement
                        ? subjectElement.value.trim()
                        : "";


                const messageValue =
                    messageElement
                        ? messageElement.value.trim()
                        : "";


                const email =
                    emailElement
                        ? emailElement.value.trim()
                        : "";



                /* Required fields */

                if (
                    !subject ||
                    !messageValue ||
                    !email
                ) {


                    alert(
                        "Bitte füllen Sie alle Felder aus."
                    );


                    return;

                }



                /* Word limit */

                const words =
                    messageValue
                        .split(/\s+/)
                        .filter(Boolean);



                if (
                    words.length > 500
                ) {


                    alert(
                        "Die Nachricht darf maximal 500 Wörter enthalten."
                    );


                    return;

                }



                /* =================================================
                   COMPANY EMAILS
                ================================================== */

                const recipients =
                    "contact@nexoraonline.de,info@nexoraonline.de";



                /* =================================================
                   EMAIL SUBJECT
                ================================================== */

                const emailSubject =
                    encodeURIComponent(
                        subject
                    );



                /* =================================================
                   EMAIL BODY
                ================================================== */

                const emailBody =
                    encodeURIComponent(

                        "Neue Nachricht über digital-horizons.ai\n\n" +

                        "Absender: " +
                        email +
                        "\n\n" +

                        "Betreff:\n" +
                        subject +
                        "\n\n" +

                        "Nachricht:\n" +
                        messageValue +
                        "\n\n" +

                        "Website:\n" +
                        window.location.href

                    );



                /* =================================================
                   MAILTO
                ================================================== */

                const mailtoUrl =
                    `mailto:${recipients}?subject=${emailSubject}&body=${emailBody}`;



                /*
                 * Open visitor email application.
                 */

                window.location.href =
                    mailtoUrl;



                /* Reset form */

                contactForm.reset();



                if (
                    wordCount
                ) {

                    wordCount.textContent =
                        "0";

                }



                /* =================================================
                   SUCCESS MESSAGE
                ================================================== */

                if (
                    successModal
                ) {


                    successModal.classList.add(
                        "open"
                    );


                    successModal.setAttribute(
                        "aria-hidden",
                        "false"
                    );


                    document.body.classList.add(
                        "modal-open"
                    );



                    setTimeout(
                        () => {


                            successModal.classList.remove(
                                "open"
                            );


                            successModal.setAttribute(
                                "aria-hidden",
                                "true"
                            );


                            document.body.classList.remove(
                                "modal-open"
                            );


                        },
                        4000
                    );

                }

            }
        );

    }



    /* =====================================================
       LEGAL MODALS
    ===================================================== */

    const legalModal =
        document.getElementById(
            "legalModal"
        );


    const legalContent =
        document.getElementById(
            "legalContent"
        );


    const legalClose =
        document.getElementById(
            "legalClose"
        );



    const legalTexts = {


        /* =================================================
           IMPRESSUM
        ================================================= */

        impressum: `

            <h2>
                Impressum
            </h2>


            <h3>
                Angaben zum Anbieter
            </h3>


            <p>
                <strong>
                    Digital Horizons UG (haftungsbeschränkt)
                </strong>
            </p>


            <p>
                Akhmed Ismail Saied<br>
                Ehndorfer Str. 130<br>
                24537 Neumünster<br>
                Deutschland
            </p>


            <h3>
                Kontakt
            </h3>


            <p>
                E-Mail:
                <a href="mailto:contact@nexoraonline.de">
                    contact@nexoraonline.de
                </a>
            </p>


            <p>
                Info:
                <a href="mailto:info@nexoraonline.de">
                    info@nexoraonline.de
                </a>
            </p>

        `,



        /* =================================================
           PRIVACY
        ================================================== */

        privacy: `

            <h2>
                Datenschutz (DSGVO)
            </h2>


            <p>
                Der Schutz personenbezogener Daten ist ein
                wichtiger Bestandteil unseres digitalen Angebots.
            </p>


            <h3>
                Personenbezogene Daten
            </h3>


            <p>
                Personenbezogene Daten werden nur verarbeitet,
                soweit dies für die Bereitstellung unserer
                digitalen Dienste oder aufgrund einer
                gesetzlichen Grundlage erforderlich ist.
            </p>


            <h3>
                Kontaktformular
            </h3>


            <p>
                Die über das Kontaktformular eingegebenen
                Informationen werden zur Bearbeitung der
                jeweiligen Anfrage verwendet.
            </p>


            <h3>
                Kontakt-E-Mail
            </h3>


            <p>
                Für Kontaktanfragen stehen folgende
                E-Mail-Adressen zur Verfügung:
            </p>


            <p>

                <a href="mailto:contact@nexoraonline.de">
                    contact@nexoraonline.de
                </a>

                <br>

                <a href="mailto:info@nexoraonline.de">
                    info@nexoraonline.de
                </a>

            </p>


            <h3>
                Ihre Rechte
            </h3>


            <p>
                Betroffene Personen haben nach Maßgabe
                der DSGVO unter anderem Rechte auf Auskunft,
                Berichtigung, Löschung und Einschränkung
                der Verarbeitung.
            </p>

        `,



        /* =================================================
           TERMS
        ================================================== */

        terms: `

            <h2>
                Nutzungsbedingungen (AGB)
            </h2>


            <p>
                Die Nutzung dieser Website erfolgt auf Grundlage
                der jeweils geltenden gesetzlichen Bestimmungen.
            </p>


            <h3>
                Nutzung der Inhalte
            </h3>


            <p>
                Inhalte dieser Website dürfen nicht ohne
                entsprechende Zustimmung vervielfältigt,
                verändert oder kommerziell genutzt werden,
                soweit gesetzlich nichts anderes vorgesehen ist.
            </p>


            <h3>
                Externe Plattformen
            </h3>


            <p>
                Links zu externen Plattformen führen zu
                eigenständigen Internetangeboten.
                Für deren Inhalte und Datenschutzbestimmungen
                gelten die jeweiligen Betreiberbedingungen.
            </p>

        `

    };



    /* =====================================================
       OPEN LEGAL MODALS
    ===================================================== */

    document
        .querySelectorAll(
            ".legal-button"
        )
        .forEach(
            (button) => {


                button.addEventListener(
                    "click",
                    () => {


                        const type =
                            button.dataset.legal;



                        if (
                            legalContent &&
                            legalTexts[type]
                        ) {


                            legalContent.innerHTML =
                                legalTexts[type];



                            legalModal.classList.add(
                                "open"
                            );



                            legalModal.setAttribute(
                                "aria-hidden",
                                "false"
                            );



                            document.body.classList.add(
                                "modal-open"
                            );

                        }

                    }
                );

            }
        );



    /* =====================================================
       CLOSE LEGAL MODAL
    ===================================================== */

    function closeLegalModal() {


        if (
            !legalModal
        ) {

            return;

        }


        legalModal.classList.remove(
            "open"
        );


        legalModal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-open"
        );

    }



    if (
        legalClose
    ) {


        legalClose.addEventListener(
            "click",
            closeLegalModal
        );

    }



    if (
        legalModal
    ) {


        legalModal.addEventListener(
            "click",
            (event) => {


                if (
                    event.target ===
                    legalModal
                ) {


                    closeLegalModal();

                }

            }
        );

    }



    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {


            if (
                event.key === "Escape"
            ) {


                closeLegalModal();



                if (
                    successModal
                ) {


                    successModal.classList.remove(
                        "open"
                    );


                    successModal.setAttribute(
                        "aria-hidden",
                        "true"
                    );


                    document.body.classList.remove(
                        "modal-open"
                    );

                }

            }

        }
    );



    /* =====================================================
       INTERNAL NAVIGATION
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            (link) => {


                link.addEventListener(
                    "click",
                    (event) => {


                        const targetId =
                            link.getAttribute(
                                "href"
                            );



                        if (
                            targetId === "#" ||
                            targetId === "#!"
                        ) {

                            return;

                        }



                        const target =
                            document.querySelector(
                                targetId
                            );



                        if (
                            target
                        ) {


                            event.preventDefault();



                            target.scrollIntoView(
                                {
                                    behavior: "smooth",
                                    block: "start"
                                }
                            );

                        }

                    }
                );

            }
        );


}); 
