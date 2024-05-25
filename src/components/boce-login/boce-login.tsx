import {State, Component, Host, h } from '@stencil/core';

@Component({
  tag: 'boce-login',
  styleUrl: 'boce-login.css',
  shadow: true,
})
export class BoceLogin {
  @State() isDoctorLogged: boolean = false;
  @State() isPatientLogged: boolean = false;

  render() {
    return (
      <Host>
          {!this.isDoctorLogged && !this.isPatientLogged ? (
            <div>
              <h1>Portál pre evidenciu chorôb a vyšetrení</h1>
              <form action="#">
              <div class="form-flex">
              <h2>Prihlásenie</h2>
                <div class="button-flex">
                  <md-elevated-button onClick={() => this.isDoctorLogged = true}>Prihlásiť sa ako lekár</md-elevated-button>
                  <md-elevated-button onClick={() => this.isPatientLogged = true}>Prihlásiť sa ako pacient</md-elevated-button>
                </div>
              </div>
              </form>
            </div>  
          ) : this.isDoctorLogged ? (
            <div>
              {<boce-doctor-patients-list></boce-doctor-patients-list>}
            </div>
          ) : (
            <div>
              {<boce-my-appointments></boce-my-appointments>}
            </div>
          )}
        
      </Host>
    );
  }

}
