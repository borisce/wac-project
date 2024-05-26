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

  private handleLogout(event: Event) {
    event.preventDefault();
    this.isLoggedOut = true;
  }

  private handleClose(event: Event) {
    event.preventDefault();
    this.isEditorClosed = true;
  }

  private handleSave(event: Event) {
    event.preventDefault();
    this.isAppointmentChanged = true;
  }

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
            <md-elevated-button onClick={(event) => this.handleLogout(event)}>Odhlásiť sa</md-elevated-button>
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
            <md-elevated-button onClick={(event) => this.handleClose(event)}>Zrušiť</md-elevated-button>
            <md-elevated-button onClick={(event) => this.handleSave(event)}>Uložiť</md-elevated-button>
          </div>
        </div>
      </Host>
    );
  }
}
