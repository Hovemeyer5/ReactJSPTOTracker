let User = function (user) {
    this.id = user.id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.username = user.username;
    this.is_admin = !!(user.is_admin*1);

    this.toJson = function(){
        return {
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name,
            username: this.username,
            is_admin: this.is_admin
        };
    }
}

export default User;