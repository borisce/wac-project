import { Component, State, Host, h, Prop } from '@stencil/core';
import { AppointmentsListApiFactory, Configuration } from '../../api/wac-project';


@Component({
  tag: 'boce-planned-appointments',
  styleUrl: 'boce-planned-appointments.css',
  shadow: true,
})
export class BocePlannedAppointments {
  @State() isLoggedOut: boolean = false;
  @State() isCancelled: boolean = false;
  @State() isBack: boolean = false;
  @State() searchQuery: string = ''; // State to hold the search query
  @State() filteredPatients: any[] = []; // State to hold the filtered patients
  @Prop() apiBase: string;
  @State() errorMessage: string;

  waitingPatients: any[];

  private async getAppointmentListAsync() {
    try {
      const response = await
        AppointmentsListApiFactory(undefined, this.apiBase).
          getAppointmentsList()
      if (response.status < 299) {
        return response.data;
      } else {
        this.errorMessage = `Cannot retrieve list of appointments: ${response.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve list of appointments: ${err.message || "unknown"}`
    }
    return [];
  }

  async componentWillLoad() {
    this.waitingPatients = await this.getAppointmentListAsync();
    this.filterPatients();
  }

  private handleSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.filterPatients();
  }

  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat('sk-SK', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
  }

  private filterPatients() {
    const today = new Date(); // Get today's date
    //const formattedToday = today.toISOString().slice(0, 10); // Format today's date

    this.filteredPatients = this.waitingPatients.filter(patient => {
      const matchesName = patient.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesDate = new Date(patient.date) >= today; // Check if the patient's date is today or from the future
      return matchesName && matchesDate;
    });
  }

  private handleLogout(event: Event) {
    event.preventDefault();
    this.isLoggedOut = true;
  }

  private handleCancel(event: Event, id: string) {
    event.preventDefault();
    const config: Configuration = {
      basePath: this.apiBase,
      isJsonMime: () => true,
    };
    const apiInstance = AppointmentsListApiFactory(config);
  
    apiInstance.deleteAppointment(id)
      .then(() => {
        // Update state to reflect cancellation
        this.isCancelled = true;
      })
      .catch((error) => {
        console.error('Error cancelling appointment:', error);
      });
  }

  private handleBack(event: Event) {
    event.preventDefault();
    this.isBack = true;
  }


  render() {
    if (this.isLoggedOut) {
      return (
          <boce-login api-base={this.apiBase}></boce-login>
      );
    }

    if (this.isCancelled) {
      return (
          <boce-my-appointments api-base={this.apiBase}></boce-my-appointments>
      );
    }

    if (this.isBack) {
      return (
          <boce-my-appointments api-base={this.apiBase}></boce-my-appointments>
      );
    }

    return (
      <Host>
        <div class="component-body">
          <header>
            <md-elevated-button onClick={(event) => this.handleLogout(event)}>Odhlásiť sa</md-elevated-button>
          </header>
          <h1>Moje plánované vyšetrenia</h1>
          <div class="filterflex">
            <div class="searchflex">
              <label class='headerinline'>Hladať podľa mena pacienta:</label>
              <input
                type="text"
                placeholder="Hľadať podľa mena"
                value={this.searchQuery}
                onInput={(event) => this.handleSearch(event)}
              />
            </div>
          </div>
          <md-list class="patient-list">
          {this.searchQuery.trim() === '' ? (
              <p>Zadajte meno pacienta do vyhľadávacieho poľa.</p>
            ) : this.filteredPatients.length > 0 ? (
              this.filteredPatients.map(patient =>
                <md-list-item>
                  <div slot="headline">{patient.name}</div>
                  <div slot="supporting-text">{"Termín vyšetrenia: " + this.formatDate(new Date(patient.date)) + " čas: " + patient.estimatedStart + " - " + patient.estimatedEnd}</div>
                  <div slot='supporting-text'>{"Dôvod vyšetrenia: " + patient.condition}</div>
                  <div slot="supporting-text">{"Záznam o vykonanom vyšetrení: " + patient.doctorNote}</div>
                  <md-elevated-button slot="end" onClick={(event) => this.handleCancel(event, patient.id)}>Zruš vyšetrenie</md-elevated-button>                  <md-icon slot="start">person</md-icon>
                </md-list-item>
              )
            ) : (
              <p>Nenašli sa žiadne plánované vyšetrenia pre zadané meno.</p>
            )}
          </md-list>
          <div class="add-term">
            <md-elevated-button onClick={(event) => this.handleBack(event)}>Spät na históriu vyšetrení</md-elevated-button>
          </div>
        </div>
      </Host>
    );
  }
}
