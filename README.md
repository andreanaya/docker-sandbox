# docker-test

Guide to set up Ubuntu server and Docker for a sample express/mongoose CRUD User API app. The goal is to set up a local and a remote enviroment and use Docker to build and deploy the application.

1. [Local environment](#local-environmen)
1. [Remote environment](#remote-environment)

## Local environment

- [ ] File structure
- [ ] Set up express/mongoose application
- [ ] Set up Docker (docker-compose)
- [ ] Set up docker-sync

## Remote environment

Set up Ubuntu user and `docker-machine`

### Create new user

Create new user account with password
```
adduser dockeradmin
```

```
Enter new UNIX password: 
Retype new UNIX password: 
passwd: password updated successfully
Changing the user information for dockeradmin
Enter the new value, or press ENTER for the default
	Full Name []: 
	Room Number []: 
	Work Phone []: 
	Home Phone []: 
	Other []: 
Is the information correct? [Y/n] y
```

Add `dockeradmin` to sudo group
```
usermod -aG sudo dockeradmin
```

### Create new SSH Key

Generate SSH Key on **local computer**
```
ssh-keygen
```

```
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/localuser/.ssh/id_rsa):
```

Copy SSH Key using `ssh-copy-id`

```
ssh-copy-id dockeradmin@server_ip
```

**ALTERNATIVE METHOD**

Manually copy SSH Key

On your **local computer**, print the SSH Public Key
```
cat ~/.ssh/id_rsa.pub
```

Copy public key output to your transfer area
```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDBGTO0tsVejssuaYR5R3Y/i73SppJAhme1dH7W2c47d4gOqB4izP0+fRLfvbz/tnXFz4iOP/H6eCV05hqUhF+KYRxt9Y8tVMrpDZR2l75o6+xSbUOMu6xN+uVF0T9XzKcxmzTmnV7Na5up3QM3DoSRYX/EP3utr2+zAqpJIfKPLdA74w7g56oYWI9blpnpzxkEd3edVJOivUkpZ4JoenWManvIaSdMTJXMy3MtlQhva+j9CgguyVbUkdzK9KKEuah+pFZvaugtebsU+bllPTB0nlXGIJk98Ie9ZtxuY3nCKneB+KjKiXrAvXUPCI9mWkYS/1rggpFmu3HbXBnWSUdf localuser@machine.local
```
_**Note:** The above SSH Key is an example_

SSH to *remote server* and create a new `.ssh` directory on the user home folder and change permissions to user read, write and execute
```
mkdir ~/.ssh
chmod 700 ~/.ssh
```

Inside the `.ssh` directory, reate a new `authorized_keys` file with `nano` and paste the public key output
```
nano ~/.ssh/authorized_keys
```

Save the file and change its permissions to user read/write
```
chmod 600 ~/.ssh/authorized_keys
```

At this point, you should be able to SSH in without password
```
ssh dockeradmin@server_ip
```

### Enable NOPASSWD
Add a new `sudoers` file using `visudo` and `nano`
```
sudo env EDITOR=nano visudo -f /etc/sudoers.d/dockeradmin
```
You will be prompet to input your password
```
[sudo] password for dockeradmin: 
```

Add the following line to the file to enable NOPASSWD for the `dockeradmin` user
```
dockeradmin ALL=(ALL:ALL) NOPASSWD:ALL
```

### Connect Docker with the server
User `docker-machine` to create a connection between your **local** and **remote** machines.

In your **local** machine, create a new `docker-machine` and give it a name. (*docker-sandbox*)
```
docker-machine create \
  --driver generic \
  --generic-ip-address=165.227.224.80 \
  --generic-ssh-key ~/.ssh/id_rsa \
  --generic-ssh-user dockeradmin \
  docker-sandbox
```

This will install Docker if not already installed.

Run `docker-machine env docker-sandbox` to connect to remote server.
```
docker-machine env docker-sandbox
```

Run `eval $(docker-machine env docker-sandbox)` to configure your shell to execute Docker commands.

### Execute any Docker command on the server
Compose you Docker project
```
docker-compose up
```

Rebuild the image
```
docker-compose build
```