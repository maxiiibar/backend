export default class UserDTO {
    constructor(user){ 
        this.nombre = user.firstName;
        this.apellido = user.lastName;
        this.correo = user.email;
        this.edad = user.age;
        this.rol = user.role;
        this.carrito = user.cart;
    }
}