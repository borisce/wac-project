import { State, Component, Host, h, Prop } from '@stencil/core';
import { AppointmentsListApiFactory, AppointmentsList } from '../../api/wac-project';

@Component({
  tag: 'boce-doctor-patients-list',
  styleUrl: 'boce-doctor-patients-list.css',
  shadow: true,
})
export class BoceDoctorPatientsList {
  @State() isCreatingPatient: boolean = false;
  @State() isLoggedOut: boolean = false;
  @State() isCreatingTerm: boolean = false;
  @State() editingEntryIndex: number | null = null;
  @State() searchQuery: string = '';
  @State() searchDate: string = '';
  @State() filteredPatients: any[] = [];
  @State() selectedPatient: any = null; // State to hold the selected patient
  @Prop() apiBase: string;
  @State() errorMessage: string;

  waitingPatients: AppointmentsList[];

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
    this.filteredPatients = this.waitingPatients;
  }

  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat('sk-SK', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
  }

  private handleSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.filterPatients();
  }

  private handleDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchDate = input.value;
    this.filterPatients();
  }

  private filterPatients() {
    this.filteredPatients = this.waitingPatients.filter(patient => {
      const matchesName = patient.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesDate = this.searchDate ? this.formatDate(new Date(patient.date)) === this.formatDate(new Date(this.searchDate)) : true;
      return matchesName && matchesDate;
    });
  }

  private handleEditClick(event: Event, index: number) {
    event.preventDefault();
    this.editingEntryIndex = index;
    this.selectedPatient = this.filteredPatients[index];
    console.log(this.selectedPatient)
  }

  private handleCreatePatient(event: Event) {
    event.preventDefault();
    this.isCreatingPatient = true;
  }

  private handleLogout(event: Event) {
    event.preventDefault();
    this.isLoggedOut = true;
  }

  private handleCreateTerm(event: Event) {
    event.preventDefault();
    this.isCreatingTerm = true;
  }

  render() {
    if (this.isLoggedOut) {
      return (
          <boce-login api-base={this.apiBase}></boce-login>
      );
    }

    if (this.isCreatingPatient) {
      return (
          <boce-create-patient api-base={this.apiBase}></boce-create-patient>
      );
    }

    if (this.isCreatingTerm) {
      return (
          <boce-create-term api-base={this.apiBase}></boce-create-term>
      );
    }

    if (this.editingEntryIndex !== null) {
      return (
          <boce-appointment-data api-base={this.apiBase} patient={this.selectedPatient}></boce-appointment-data>
      );
    }

    return (
      <Host>
        <div class="component-body">
          <header>
            <md-elevated-button onClick={(event) => this.handleCreatePatient(event)}>Vytvor celý záznam o vyšetrení pacienta</md-elevated-button>
            <md-elevated-button onClick={(event) => this.handleLogout(event)}>Odhlásiť sa</md-elevated-button>
          </header>
          <h1>Zoznam vykonaných a plánovaných vyšetrení</h1>
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
            <div class="datepickerflex">
              <label class='headerinline'>Vyberte deň:</label>
              <input type="date" id="Test_DatetimeLocal" value={this.searchDate} onInput={(event) => this.handleDateChange(event)} />
            </div>
          </div>
          {this.errorMessage
        ? <div class="error">{this.errorMessage}</div>
        :
          <md-list class="patient-list">
            {this.filteredPatients.map((patient, index) =>
              <md-list-item>
                <div slot="headline">{patient.name}</div>
                <div slot="supporting-text">{"Termín vyšetrenia: " + this.formatDate(new Date(patient.date)) + " čas: " + patient.estimatedStart + " - " + patient.estimatedEnd}</div>
                <div slot='supporting-text'>{"Dôvod vyšetrenia: " + patient.condition}</div>
                <div slot="supporting-text">{"Záznam o vykonanom vyšetrení: " + patient.doctorNote}</div>
                <md-icon slot="start">person</md-icon>
                <md-elevated-button slot="end" onClick={(event) => this.handleEditClick(event, index)}>Uprav záznam o vyšetrení</md-elevated-button>
              </md-list-item>
            )}   
          </md-list>
        }  
          <div class="add-term">
            <md-elevated-button onClick={(event) => this.handleCreateTerm(event)}>Pridaj nový termín vyšetrenia</md-elevated-button>
          </div>
        </div>
      </Host>
    );
  }
}
