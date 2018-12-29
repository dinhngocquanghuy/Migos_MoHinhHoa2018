const database = require("../database/mysql");

var role_db = "buyer";

find_user = username => {
    console.log("users.find_user");
    console.log(`find_user function: ${username}`);
    const query = `SELECT * FROM \`${role_db}\` WHERE username='${username}'`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}

add_user = (user) => {
    console.log(`add_user function: ${user.username}`);
    const query = `INSERT INTO \`${role_db}\` (\`username\`, \`password\`, \`fullname\`, \`email\`, \`address\`, \`phonenumber\`, \`role\`) VALUES ('${user.username}', '${user.password}', '${user.fullname}', '${user.email}', '${user.address}', '${user.phone}', '${user.role}')`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}

edit_user = (user) => {
    console.log(`add_user function: ${user.username}`);
    const query = `UPDATE \`${role_db}\` SET \`password\`='${user.password}',\`fullname\`='${user.fullname}',\`email\`='${user.email}',\`address\`='${user.address}',\`phonenumber\`='${user.phone}',\`role\`='${user.role}' WHERE \`username\`='${user.username}'`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}

exports.authenticate = (username, password, role) => new Promise((resolve, reject) => {


    if(role == 1)
        role_db = "buyer";
    else
        role_db = "seller";


    console.log("users_model:authenticate: Entry " + username + " " + password + " " + role);
    find_user(username).then(user => {
        console.log("users_model:authenticate: " + user[0].username + " " + user[0].password);
        if (Object.keys(user).length == 0) {
            reject("Cannot find this user");
        } else if (user[0].password.trim() == password.trim()) {
            resolve(user[0]);
        } else {
            reject();
        }
    }).catch(rej => {
        console.log(rej);
        reject();
    })
})

exports.add_new = (user) => new Promise((resolve, reject) => {

    if(user.role == 1)
        role_db = "buyer";
    else
        role_db = "seller";

    console.log("users.add_new");
    find_user(user.username).then(find_user_resolve => {
        console.log(find_user_resolve);
        if (find_user_resolve.length > 0) {
            reject("User already exits");
        } else {
            add_user(user).then(add_user_resolve => {
                console.log(add_user_resolve);
                resolve("Register successfully");
            }).catch(add_user_resolve => {
                reject(add_user_resolve)
            })
        }
    }).catch(find_user_reject => {
        console.log(find_user_reject);
        add_user(user).then(add_user_resolve => {
            console.log(add_user_resolve);
            resolve("Register successfully");
        }).catch(add_user_resolve => {
            reject(add_user_resolve)
        })
    });
});

exports.edit = (user) => new Promise((resolve, reject) => {

    if(user.role == 1)
        role_db = "buyer";
    else
        role_db = "seller";

    find_user(user.username).then(find_user_resolve => {
        console.log(find_user_resolve);
        if (find_user_resolve.length > 0) {
            edit_user(user).then(edit_user_resolve => {
                console.log(edit_user_resolve);
                resolve("Edit user successfully");
            }).catch(edit_user_resolve => {
                reject(edit_user_resolve)
            })

        } else {
            console.log("User doesn't exits");
            reject("User doesn't exits");
        }
    }).catch(find_user_reject => {
        console.log(find_user_reject);
        reject("User doesn't exits");
    });
});
