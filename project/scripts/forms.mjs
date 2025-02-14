export default function formToggleLight() {
    main.querySelectorAll("form").forEach((form) => {
        form.classList.toggle("lightMode");
    });
    main.querySelectorAll("fieldset").forEach((field) => {
        field.classList.toggle("lightMode");
        field.querySelector("legend").classList.toggle("lightMode");
    });
};