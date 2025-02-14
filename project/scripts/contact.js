import toggleLight from "./base.mjs";
import formToggleLight from "./forms.mjs";

light.addEventListener("click", () => {
    formToggleLight();
    toggleLight();
});