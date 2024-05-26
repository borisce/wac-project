/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface BoceAppointmentData {
        "patient": any;
    }
    interface BoceCreatePatient {
        "entryId": string;
    }
    interface BoceCreateTerm {
    }
    interface BoceDoctorPatientsList {
    }
    interface BoceLogin {
    }
    interface BoceMyAppointments {
    }
    interface BocePlannedAppointments {
    }
    interface BoceReserveAppointment {
    }
}
declare global {
    interface HTMLBoceAppointmentDataElement extends Components.BoceAppointmentData, HTMLStencilElement {
    }
    var HTMLBoceAppointmentDataElement: {
        prototype: HTMLBoceAppointmentDataElement;
        new (): HTMLBoceAppointmentDataElement;
    };
    interface HTMLBoceCreatePatientElement extends Components.BoceCreatePatient, HTMLStencilElement {
    }
    var HTMLBoceCreatePatientElement: {
        prototype: HTMLBoceCreatePatientElement;
        new (): HTMLBoceCreatePatientElement;
    };
    interface HTMLBoceCreateTermElement extends Components.BoceCreateTerm, HTMLStencilElement {
    }
    var HTMLBoceCreateTermElement: {
        prototype: HTMLBoceCreateTermElement;
        new (): HTMLBoceCreateTermElement;
    };
    interface HTMLBoceDoctorPatientsListElement extends Components.BoceDoctorPatientsList, HTMLStencilElement {
    }
    var HTMLBoceDoctorPatientsListElement: {
        prototype: HTMLBoceDoctorPatientsListElement;
        new (): HTMLBoceDoctorPatientsListElement;
    };
    interface HTMLBoceLoginElement extends Components.BoceLogin, HTMLStencilElement {
    }
    var HTMLBoceLoginElement: {
        prototype: HTMLBoceLoginElement;
        new (): HTMLBoceLoginElement;
    };
    interface HTMLBoceMyAppointmentsElement extends Components.BoceMyAppointments, HTMLStencilElement {
    }
    var HTMLBoceMyAppointmentsElement: {
        prototype: HTMLBoceMyAppointmentsElement;
        new (): HTMLBoceMyAppointmentsElement;
    };
    interface HTMLBocePlannedAppointmentsElement extends Components.BocePlannedAppointments, HTMLStencilElement {
    }
    var HTMLBocePlannedAppointmentsElement: {
        prototype: HTMLBocePlannedAppointmentsElement;
        new (): HTMLBocePlannedAppointmentsElement;
    };
    interface HTMLBoceReserveAppointmentElement extends Components.BoceReserveAppointment, HTMLStencilElement {
    }
    var HTMLBoceReserveAppointmentElement: {
        prototype: HTMLBoceReserveAppointmentElement;
        new (): HTMLBoceReserveAppointmentElement;
    };
    interface HTMLElementTagNameMap {
        "boce-appointment-data": HTMLBoceAppointmentDataElement;
        "boce-create-patient": HTMLBoceCreatePatientElement;
        "boce-create-term": HTMLBoceCreateTermElement;
        "boce-doctor-patients-list": HTMLBoceDoctorPatientsListElement;
        "boce-login": HTMLBoceLoginElement;
        "boce-my-appointments": HTMLBoceMyAppointmentsElement;
        "boce-planned-appointments": HTMLBocePlannedAppointmentsElement;
        "boce-reserve-appointment": HTMLBoceReserveAppointmentElement;
    }
}
declare namespace LocalJSX {
    interface BoceAppointmentData {
        "patient"?: any;
    }
    interface BoceCreatePatient {
        "entryId"?: string;
    }
    interface BoceCreateTerm {
    }
    interface BoceDoctorPatientsList {
    }
    interface BoceLogin {
    }
    interface BoceMyAppointments {
    }
    interface BocePlannedAppointments {
    }
    interface BoceReserveAppointment {
    }
    interface IntrinsicElements {
        "boce-appointment-data": BoceAppointmentData;
        "boce-create-patient": BoceCreatePatient;
        "boce-create-term": BoceCreateTerm;
        "boce-doctor-patients-list": BoceDoctorPatientsList;
        "boce-login": BoceLogin;
        "boce-my-appointments": BoceMyAppointments;
        "boce-planned-appointments": BocePlannedAppointments;
        "boce-reserve-appointment": BoceReserveAppointment;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "boce-appointment-data": LocalJSX.BoceAppointmentData & JSXBase.HTMLAttributes<HTMLBoceAppointmentDataElement>;
            "boce-create-patient": LocalJSX.BoceCreatePatient & JSXBase.HTMLAttributes<HTMLBoceCreatePatientElement>;
            "boce-create-term": LocalJSX.BoceCreateTerm & JSXBase.HTMLAttributes<HTMLBoceCreateTermElement>;
            "boce-doctor-patients-list": LocalJSX.BoceDoctorPatientsList & JSXBase.HTMLAttributes<HTMLBoceDoctorPatientsListElement>;
            "boce-login": LocalJSX.BoceLogin & JSXBase.HTMLAttributes<HTMLBoceLoginElement>;
            "boce-my-appointments": LocalJSX.BoceMyAppointments & JSXBase.HTMLAttributes<HTMLBoceMyAppointmentsElement>;
            "boce-planned-appointments": LocalJSX.BocePlannedAppointments & JSXBase.HTMLAttributes<HTMLBocePlannedAppointmentsElement>;
            "boce-reserve-appointment": LocalJSX.BoceReserveAppointment & JSXBase.HTMLAttributes<HTMLBoceReserveAppointmentElement>;
        }
    }
}
