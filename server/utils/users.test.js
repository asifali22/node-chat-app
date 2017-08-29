const { Users } = require('./users');
const expect = require('expect');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'lohit',
            room: 'Node'
        }, {
            id: '2',
            name: 'Adarsh',
            room: 'React'
        }, {
            id: '3',
            name: 'beeta',
            room: 'Node'
        }];
    });

    it('should add a new user', () => {
        var users = new Users();
        var user = {
            id: '1',
            name: 'asif',
            room: 'Jaitra'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names for node course', () => {
        var userList = users.getUserList('Node');
        expect(userList).toEqual(['lohit', 'beeta']);

    });
    it('should return names for react course', () => {
        var userList = users.getUserList('React');
        expect(userList).toEqual(['Adarsh']);

    });
});