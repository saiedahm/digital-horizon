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


    if (languageButton && languageMenu) {

        languageButton.addEventListener("click", (event) => {

            event.stopPropagation();

            const opened =
                languageMenu.classList.toggle("open");

            languageButton.setAttribute(
                "aria-expanded",
                opened ? "true" : "false"
            );

        });


        document.addEventListener("click", (event) => {

            if (
                !languageMenu.contains(event.target) &&
                !languageButton.contains(event.target)
            ) {

                languageMenu.classList.remove("open");

                languageButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* =====================================================
       LANGUAGE SELECTION
       Uses Google Translate so the existing language menu
       actually translates the visible page without changing
       the website design.
    ===================================================== */

    const supportedLanguages = [
        "de","en","fr","es","it","pt","nl","da","sv","no","fi",
        "pl","cs","sk","hu","ro","bg","el","tr","ru","uk","ar",
        "he","fa","hi","bn","ur","zh-CN","ja","ko","vi","th","id"
    ];

    let googleTranslateReady = false;

    window.googleTranslateElementInit = function () {
        if (!window.google || !google.translate) return;

        new google.translate.TranslateElement(
            {
                pageLanguage: "de",
                includedLanguages: supportedLanguages.join(","),
                autoDisplay: false
            },
            "google_translate_element"
        );

        googleTranslateReady = true;
    };

    const googleScript = document.createElement("script");
    googleScript.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    googleScript.async = true;
    document.head.appendChild(googleScript);

    function applyLanguage(lang) {
        document.documentElement.lang = lang;

        if (["ar", "he", "fa", "ur"].includes(lang)) {
            document.documentElement.dir = "rtl";
        } else {
            document.documentElement.dir = "ltr";
        }

        const selectLanguage = () => {
            const combo = document.querySelector(".goog-te-combo");

            if (!combo) return false;

            combo.value = lang;
            combo.dispatchEvent(new Event("change"));

            return true;
        };

        if (lang === "de") {
            // Reset Google Translate back to the original German page.
            const combo = document.querySelector(".goog-te-combo");
            if (combo) {
                combo.value = "de";
                combo.dispatchEvent(new Event("change"));
            } else {
                // Reloading is the most reliable reset on static hosting.
                window.location.reload();
            }
            return;
        }

        if (selectLanguage()) return;

        let attempts = 0;
        const timer = setInterval(() => {
            attempts++;

            if (selectLanguage() || attempts >= 40) {
                clearInterval(timer);
            }
        }, 250);
    }

    languageButtons.forEach(button => {
        button.addEventListener("click", () => {
            const lang = button.dataset.lang;
            const languageName = button.textContent.trim();

            if (languageButton) {
                languageButton.innerHTML =
                    `${languageName} <span>▾</span>`;
            }

            if (languageMenu) {
                languageMenu.classList.remove("open");
            }

            if (supportedLanguages.includes(lang)) {
                applyLanguage(lang);
            }
        });
    });


    /* =====================================================
       CONTACT WORD COUNTER
    ===================================================== */

    const message =
        document.getElementById("message");

    const wordCount =
        document.getElementById("wordCount");


    if (message && wordCount) {

        message.addEventListener("input", () => {

            let text =
                message.value.trim();

            let words =
                text
                    ? text.split(/\s+/).length
                    : 0;


            /*
             * Hard limit: 500 words
             */

            if (words > 500) {

                const limitedWords =
                    text
                        .split(/\s+/)
                        .slice(0, 500)
                        .join(" ");

                message.value =
                    limitedWords;

                words = 500;
            }

            wordCount.textContent =
                words;

        });

    }


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    const successModal =
        document.getElementById("successModal");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const subject =
                    document
                        .getElementById("subject")
                        .value
                        .trim();

                const messageValue =
                    document
                        .getElementById("message")
                        .value
                        .trim();

                const email =
                    document
                        .getElementById("email")
                        .value
                        .trim();


                if (!subject ||
                    !messageValue ||
                    !email) {

                    return;
                }


                /*
                 * Verify word count.
                 */

                const words =
                    messageValue
                        .split(/\s+/)
                        .filter(Boolean);


                if (words.length > 500) {

                    alert(
                        "Die Nachricht darf maximal 500 Wörter enthalten."
                    );

                    return;
                }


                /*
                 * The interface is ready.
                 *
                 * IMPORTANT:
                 * To deliver the email for real, connect this
                 * form to your email/API endpoint.
                 */

                contactForm.reset();

                if (wordCount) {
                    wordCount.textContent = "0";
                }


                if (successModal) {

                    successModal.classList.add("open");

                    successModal.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                    document.body.classList.add(
                        "modal-open"
                    );


                    /*
                     * Automatically return to homepage.
                     */

                    setTimeout(() => {

                        successModal.classList.remove("open");

                        successModal.setAttribute(
                            "aria-hidden",
                            "true"
                        );

                        document.body.classList.remove(
                            "modal-open"
                        );

                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });

                    }, 2800);

                }

            }
        );

    }


    /* =====================================================
       LEGAL MODALS
    ===================================================== */

    const legalModal =
        document.getElementById("legalModal");

    const legalContent =
        document.getElementById("legalContent");

    const legalClose =
        document.getElementById("legalClose");


    const legalTexts = {

        impressum: `
            <h2>Impressum</h2>

            <h3>Angaben zum Anbieter</h3>

            <p>
                <strong>NEXORA Digital</strong>
            </p>

            <p>
                Akhmed Ismail Saied<br>
                Ehndorfer Str. 130<br>
                24537 Neumünster<br>
                Deutschland
            </p>

            <h3>Kontakt</h3>

            <p>
                Die vollständigen Kontaktdaten werden
                entsprechend den gesetzlichen Anforderungen
                innerhalb des Impressums bereitgestellt.
            </p>
        `,


        privacy: `
            <h2>Datenschutz (DSGVO)</h2>

            <p>
                Der Schutz personenbezogener Daten ist ein
                wichtiger Bestandteil unseres digitalen Angebots.
            </p>

            <h3>Personenbezogene Daten</h3>

            <p>
                Personenbezogene Daten werden nur verarbeitet,
                soweit dies für die Bereitstellung unserer
                digitalen Dienste oder aufgrund einer
                gesetzlichen Grundlage erforderlich ist.
            </p>

            <h3>Kontaktformular</h3>

            <p>
                Angaben aus dem Kontaktformular werden ausschließlich
                zur Bearbeitung der jeweiligen Anfrage verwendet,
                sobald das Formular mit einem tatsächlichen
                E-Mail-Dienst verbunden ist.
            </p>

            <h3>Ihre Rechte</h3>

            <p>
                Betroffene Personen haben nach Maßgabe der DSGVO
                unter anderem Rechte auf Auskunft, Berichtigung,
                Löschung und Einschränkung der Verarbeitung.
            </p>
        `,


        terms: `
            <h2>Nutzungsbedingungen (AGB)</h2>

            <p>
                Die Nutzung dieser Website erfolgt auf Grundlage
                der jeweils geltenden gesetzlichen Bestimmungen.
            </p>

            <h3>Nutzung der Inhalte</h3>

            <p>
                Inhalte dieser Website dürfen nicht ohne
                entsprechende Zustimmung vervielfältigt,
                verändert oder kommerziell genutzt werden,
                soweit gesetzlich nichts anderes vorgesehen ist.
            </p>

            <h3>Externe Plattformen</h3>

            <p>
                Links zu externen Plattformen führen zu
                eigenständigen Internetangeboten.
                Für deren Inhalte und Datenschutzbestimmungen
                gelten die jeweiligen Betreiberbedingungen.
            </p>
        `

    };


    document
        .querySelectorAll(".legal-button")
        .forEach(button => {

            button.addEventListener("click", () => {

                const type =
                    button.dataset.legal;

                if (
                    legalContent &&
                    legalTexts[type]
                ) {

                    legalContent.innerHTML =
                        legalTexts[type];

                    legalModal.classList.add("open");

                    legalModal.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                    document.body.classList.add(
                        "modal-open"
                    );

                }

            });

        });


    /* =====================================================
       CLOSE LEGAL MODAL
    ===================================================== */

    function closeLegalModal() {

        legalModal.classList.remove("open");

        legalModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    if (legalClose) {

        legalClose.addEventListener(
            "click",
            closeLegalModal
        );

    }


    if (legalModal) {

        legalModal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === legalModal
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

            if (event.key === "Escape") {

                closeLegalModal();

                if (successModal) {

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
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");

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

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });

});
