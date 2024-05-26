import { Component, Host, h, State, Prop } from '@stencil/core';
import { AppointmentsListApiFactory, AppointmentsList } from '../../api/wac-project';
//import { HTMLInputElement } from '@stencil/core/internal';

@Component({
  tag: 'boce-create-term',
  styleUrl: 'boce-create-term.css',
  shadow: true,
})
export class BoceCreateTerm {
  @State() isTermCreated: boolean = false;
  @State() isCreateTermClosed: boolean = false;
  @State() isLoggedOut: boolean = false;
  @Prop() apiBase: string;

  private handleLogout(event: Event) {
    event.preventDefault();
    this.isLoggedOut = true;
  }

  private handleClose(event: Event) {
    event.preventDefault();
    this.isCreateTermClosed = true;
  }

  private handleCreateTerm(event: Event) {
    event.preventDefault();

    // Collect input data from form fields
    const dateInput2 = (event.target as HTMLElement).closest('form').querySelector('#date2') as HTMLInputElement;
    const timeStartInput2 = (event.target as HTMLElement).closest('form').querySelector('#begintime2') as HTMLInputElement;
    const timeEndInput2 = (event.target as HTMLElement).closest('form').querySelector('#endtime2') as HTMLInputElement;

    // Validate input data
    /*if (!dateInput.value || !timeStartInput.value || !timeEndInput.value) {
      console.error('Please fill in all fields');
      return;
    }*/

    // Create new term object
    const newTerm: AppointmentsList = {
      id: "", // Provide an appropriate value for ID
      date: dateInput2.value,
      estimatedStart: timeStartInput2.value,
      estimatedEnd: timeEndInput2.value,
      patientAppointed: false,
    };

    // Send new term data to the server
    const config = {
      basePath: this.apiBase,
      isJsonMime: () => true,
    };

    const apiInstance = AppointmentsListApiFactory(config);

    console.log("New term:", newTerm); // Add console log to check new term object

    apiInstance.createAppointment(newTerm)
      .then(() => {
        this.isTermCreated = true;
      })
      .catch((error) => {
        console.error('Error creating term:', error);
      });
  }

  render() {
    if (this.isLoggedOut) {
      return (
        <boce-login api-base={this.apiBase}></boce-login>
      );
    }

    if (this.isCreateTermClosed) {
      return (
        <boce-doctor-patients-list api-base={this.apiBase}></boce-doctor-patients-list>
      );
    }

    if (this.isTermCreated) {
      return (
        <boce-doctor-patients-list api-base={this.apiBase}></boce-doctor-patients-list>
      );
    }

    return (
      <Host>
        <header>
          <md-elevated-button onClick={(event) => this.handleLogout(event)}>Odhlásiť sa</md-elevated-button>
        </header>
        <h1>Vytvorenie nového voľného termínu vyšetrenia</h1>
        <form action="#">
          <div class="form-flex">
            <label htmlFor="date">Dátum vyšetrenia</label>
            <input type="date" id="date2" />
            <label htmlFor="begintime2">Čas začiatku vyšetrenia</label>
            <input type="time" id="begintime2" />
            <label htmlFor="endtime2">Čas ukončenia vyšetrenia</label>
            <input type="time" id="endtime2" />
            <div class="button-flex">
              <md-elevated-button onClick={(event) => this.handleClose(event)}>Zrušiť</md-elevated-button>
              <md-elevated-button onClick={(event) => this.handleCreateTerm(event)}>Vytvoriť voľný termín</md-elevated-button>
            </div>
          </div>
        </form>
      </Host>
    );
  }
}
