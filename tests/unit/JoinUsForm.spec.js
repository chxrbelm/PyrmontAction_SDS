import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import JoinUsForm from "../../src/components/JoinUsForm.vue";

describe("JoinUsForm.vue", () => {
    describe("Password validation", () => {
        it("marks password rules correctly", async () => {
            const wrapper = mount(JoinUsForm);

            // set weak password
            await wrapper.find("#password").setValue("weak");
            expect(wrapper.vm.passwordValidator.minlength).toBe(false);
            expect(wrapper.vm.passwordValidator.uppercase).toBe(false);
        });
    });
});
