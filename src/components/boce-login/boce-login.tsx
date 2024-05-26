import {State, Component, Host, h } from '@stencil/core';

@Component({
  tag: 'boce-login',
  styleUrl: 'boce-login.css',
  shadow: true,
})
export class BoceLogin {
  @State() isDoctorLogged: boolean = false;
  @State() isPatientLogged: boolean = false;

  private handleDoctorLogin(event: Event) {
    event.preventDefault();
    this.isDoctorLogged = true;
  }

  private handlePatientLogin(event: Event) {
    event.preventDefault();
    this.isPatientLogged = true;
  }

  render() {
    if (this.isDoctorLogged) {
      return (
          <boce-doctor-patients-list></boce-doctor-patients-list>
      );
    }

    if (this.isPatientLogged) {
      return (
          <boce-my-appointments></boce-my-appointments>
      );
    }

    return (
      <Host>
            <div>
              <h1>Portál pre evidenciu chorôb a vyšetrení</h1>
              <form action="#">
              <div class="form-flex">
              <h2>Prihlásenie</h2>
                <div class="button-flex">
                  <md-elevated-button onClick={(event) => this.handleDoctorLogin(event)}>Prihlásiť sa ako lekár</md-elevated-button>
                  <md-elevated-button onClick={(event) => this.handlePatientLogin(event)}>Prihlásiť sa ako pacient</md-elevated-button>
                </div>
              </div>
              </form>
            </div>  
      </Host>
    );
  }

}
