const { Component, mount, xml, useState, useRef } = owl;


class UserProfile extends Component {
    static template = xml`  
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-6 text-center">
                  <img t-att-src="state.profilePicture" alt="Profile Picture" width="200px" class="img-thumbnail img-fluid" />
                  <input t-if="state.isEditing" type="file" t-on-change="onFileChange"/>
                </div>
                <div class="col-md-6">
                    <div t-if="!state.isEditing">
                        <p t-esc="state.userName"></p>
                        <p t-esc="state.userEmail"></p>
                        <div class="d-flex justify-content-end mt-4">    
                            <button t-on-click="editProfile" class="ml-auto btn btn-primary">Edit</button>
                        </div>
                    </div>
                    <div t-if="state.isEditing">
                       <form>
                             <label>name</label>
                            <input class="form-control" t-model="state.editName"  type="text"/>
                            <label>email</label>
                            <input class="form-control" t-model="state.editEmail" type="text"/>
                            <div class="d-flex justify-content-end mt-4">
                                <button t-on-click="saveData" type="button" class="btn btn-primary">Save</button>
                                <button t-on-click="editProfile" type="button" class="ms-1 btn btn-danger">Cancel</button>
                            </div>
                           
                       </form>
                    </div>
                </div>
            </div>
        </div>
                     `

    setup() {
        this.state = useState({
            userName: this.userName || 'John Doe',
            userEmail: this.userEmail || 'john@test.com',
            editName: this.userName || 'John Doe',
            editEmail: this.userEmail || 'john@test.com',
            profilePicture: this.profilePicture || 'https://via.placeholder.com/100',
            editPhoto: this.profilePicture || 'https://via.placeholder.com/100',
            isEditing: false,
        });



    }
    onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64String = e.target.result.split(',')[1];
                this.state.editPhoto = `data:${file.type};base64,${base64String}`;
            };
            reader.readAsDataURL(file);
        }
    }
    editProfile() {
        this.state.isEditing = !this.state.isEditing;
    }
    saveData() {
        this.state.userName = this.state.editName;
        this.state.userEmail = this.state.editEmail;
        this.state.profilePicture = this.state.editPhoto;
        this.editProfile();
    }

}

mount(UserProfile, document.getElementById("root"));