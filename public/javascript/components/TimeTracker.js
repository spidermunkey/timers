export class TimeTracker  extends Timer {
    constructor({props}) {
        super(props);

        this.successTime = props.successTime;
        
        this.onSuccess = props.onSucces || function() {
            alert(`${this.title} tracker has completed`)
        };
    }
}