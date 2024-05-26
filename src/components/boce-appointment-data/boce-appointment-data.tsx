import { Component, Host, Prop, h, State } from '@stencil/core';
import { AppointmentsListApiFactory, AppointmentsList, Configuration } from '../../api/wac-project';
import axios from 'axios';

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
  @State() doctorNote: string;
  @Prop() apiBase: string;

  componentWillLoad() {
    this.doctorNote = this.patient.doctorNote || '';
  }

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
    console.log("Save button clicked");

    const config = new Configuration({
      basePath: this.apiBase,
    });

    const apiInstance = AppointmentsListApiFactory(config, '', axios);

    const updatedAppointment: AppointmentsList = {
      ...this.patient,
      doctorNote: this.doctorNote,
    };

    console.log("Updated Appointment Data: ", updatedAppointment);

    apiInstance.updateAppointment(this.patient.id, updatedAppointment)
      .then(() => {
        this.isAppointmentChanged = true;
        console.log("Appointment updated successfully");
      })
      .catch((error) => {
        this.isAppointmentChanged = true;
        console.error('Error updating appointment:', error);
      });
  }

  private handleTextareaChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.doctorNote = target.value;
  }

  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat('sk-SK', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
  }

  render() {
    if (this.isLoggedOut) {
      return (
        <Host>
          <boce-login api-base={this.apiBase}></boce-login>
        </Host>
      );
    }

    if (this.isEditorClosed) {
      return (
        <Host>
          <boce-doctor-patients-list api-base={this.apiBase}></boce-doctor-patients-list>
        </Host>
      );
    }

    if (this.isAppointmentChanged) {
      return (
        <Host>
          <boce-doctor-patients-list api-base={this.apiBase}></boce-doctor-patients-list>
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
            <p><strong>Termín vyšetrenia:</strong> {this.formatDate(new Date(this.patient.date))} {this.patient.estimatedStart} - {this.patient.estimatedEnd}</p>
            <p><strong>Dôvod vyšetrenia:</strong> {this.patient.condition}</p>
            <label htmlFor="appointment_data_textarea">Záznam lekára o vykonanom vyšetrení:</label>
            <textarea 
              name="appointment_data" 
              id="appointment_data_textarea" 
              value={this.doctorNote} 
              onInput={(event) => this.handleTextareaChange(event)}>
            </textarea>
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
