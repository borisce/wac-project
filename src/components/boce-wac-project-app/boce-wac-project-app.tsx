import { Component, Host, Prop, State, h } from '@stencil/core';

declare global {
  interface Window { navigation: any; }
}

@Component({
  tag: 'boce-wac-project-app',
  styleUrl: 'boce-wac-project-app.css',
  shadow: true,
})
export class BoceWacProjectApp {

  @State() private relativePath = "";

  @Prop() basePath: string="";

  componentWillLoad() {
    const baseUri = new URL(this.basePath, document.baseURI || "/").pathname;
    console.log(baseUri)
    console.log(document.baseURI)
    const toRelative = (path: string) => {
      if (path.startsWith( baseUri)) {
        this.relativePath = path.slice(baseUri.length)
      } else {
        this.relativePath = ""
      }
    }

    window.navigation?.addEventListener("navigate", (ev: Event) => {
      if ((ev as any).canIntercept) { (ev as any).intercept(); }
      let path = new URL((ev as any).destination.url).pathname;
      console.log(path)
      toRelative(path);
    });

    toRelative(location.pathname)
  }  

  render() {
    let element = "login"
    let entryId = "@new"
    console.log(this.relativePath)
    if ( this.relativePath.startsWith("entry/"))
    {
      element = "editor";
      entryId = this.relativePath.split("/")[1]
    }
    else if(this.relativePath.startsWith("create_patient")){
      element = "create_patient"
    }
    else if(this.relativePath.startsWith("patient_data")){
      element = "patient_data"
    }
    else if(this.relativePath.startsWith("reserve_appointment")){
      element = "reserve_appointment"
    }
    else if(this.relativePath.startsWith("planned_appointments")){
      element = "planned_appointments"
    }
    else if(this.relativePath.startsWith("search")){
      element = "search"
    }
    else if(this.relativePath.startsWith("my_appointments")){
      console.log("ideee")
      element = "my_appointments"
    }
    else if(this.relativePath.startsWith("create_term")){
      element = "create_term"
    }
    else if(this.relativePath.startsWith("login")){
      element = "login"
    }
    else if(this.relativePath.startsWith("doctor_homepage")){
      element = "patients"
    }

  
    const navigate = (path:string) => {
      const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
      console.log(absolute)
      window.navigation.navigate(absolute)
    }
  
    return (
      <Host>
        {element === "editor" ? (
          <boce-appointment-data 
          entry-id={entryId} oneditor-closed={() => navigate("/")}
          onPatientdetail-clicked={() => navigate("/patient_data")}
          onlogout-clicked={() => navigate("/login")}
           />
        ) : element === "patients" ? (
          <boce-doctor-patients-list 
          onnew-clicked={() => navigate("/create_patient")}
          onentry-clicked={(ev: CustomEvent<string>) => navigate("/entry/" + ev.detail)} 
          onlogout-clicked={() => navigate("/login")}
          onnewterm-clicked={() => navigate("/create_term")}/>
          
        ) : element === "create_patient" ? (
          <boce-create-patient 
          onpatient-created={() => navigate("/")}
          oncreate-closed={() => navigate("/")}
          onlogout-clicked={() => navigate("/login")}/>
        ) : element === "patient_data" ? (
          <boce-patient-data 
          onentry-clicked={(ev: CustomEvent<string>) => navigate("/entry/" + ev.detail)}
          onlist-clicked={() => navigate("/")}
          onlogout-clicked={() => navigate("/login")}/>
        ) : element === "reserve_appointment" ? (
          <boce-reserve-appointment 
          onreserve-clicked={() => navigate("/my_appointments")}
          onlogout-clicked={() => navigate("/login")}/>
        ) : element === "planned_appointments" ? (
          <boce-planned-appointments 
          onreserve-clicked={() => navigate("/my_appointments")}
          onlogout-clicked={() => navigate("/login")}/>
        ) : element === "search" ? (
          <boce-patient-search />
        ) :  element === "my_appointments" ? (
          <boce-my-appointments 
          onlogout-clicked={() => navigate("/login")}
          onavailable-clicked={() => navigate("/reserve_appointment")}
          onplanned-clicked={() => navigate("/planned_appointments")}/>
        ) :  element === "create_term" ? (
          <boce-create-term 
          onterm-created={() => navigate("/")}
          oncreateterm-closed={() => navigate("/")}
          onlogout-clicked={() => navigate("/login")}/>
        ) :  element === "login" ? (
          <boce-login 
          ondoctor-logged={() => navigate("/doctor_homepage")}
          onpatient-logged={() => navigate("/my_appointments")} />
        ) : (
          <div>No component selected</div>
        )}
  
      </Host>
    );
  }

}
