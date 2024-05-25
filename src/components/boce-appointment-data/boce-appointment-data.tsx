import { Component, Host, Prop, h, State } from '@stencil/core';

@Component({
  tag: 'boce-appointment-data',
  styleUrl: 'boce-appointment-data.css',
  shadow: true,
})
export class BoceAppointmentData {
  @Prop() patient: any;

  @State() isEditorClosed: boolean = false;
  @State() isLoggedOut: boolean = false;
  @State() isAppointmentChanged: boolean = false;

  render() {
    if (this.isLoggedOut) {
      return (
        <Host>
          <boce-login></boce-login>
        </Host>
      );
    }

    if (this.isEditorClosed) {
      return (
        <Host>
          <boce-doctor-patients-list></boce-doctor-patients-list>
        </Host>
      );
    }

    if (this.isAppointmentChanged) {
      return (
        <Host>
          <boce-doctor-patients-list></boce-doctor-patients-list>
        </Host>
      );
    }

    return (
      <Host>
        <div class="component-body">
          <header>
            <md-elevated-button onClick={() => this.isLoggedOut = true}>Odhlásiť sa</md-elevated-button>
          </header>
          <h1>Záznam o vyšetrení</h1>
          <div class="data-flex">
            <div class="patient-flex">
              <p><strong>Meno pacienta:</strong> {this.patient.name}</p>
            </div>
            <p><strong>Termín vyšetrenia:</strong> {this.patient.date.toLocaleDateString('sk-SK')} {this.patient.estimatedStart} - {this.patient.estimatedEnd}</p>
            <p><strong>Dôvod vyšetrenia:</strong> {this.patient.condition}</p>
            <label htmlFor="appointment_data_textarea">Záznam lekára o vykonanom vyšetrení:</label>
            <textarea name="appointment_data" id="appointment_data_textarea" value={this.patient.doctorNote}></textarea>
          </div>
          <div class="buttons-flex">
            <md-elevated-button onClick={() => this.isEditorClosed = true}>Zrušiť</md-elevated-button>
            <md-elevated-button onClick={() => this.isAppointmentChanged = true}>Uložiť</md-elevated-button>
          </div>
        </div>
      </Host>
    );
  }
}
