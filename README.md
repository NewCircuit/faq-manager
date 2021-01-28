# faq-manager-rewrite

Faq manager is a bot that can handle the faq for you, no longer having to hastle with webhooks or mods that leave. If you want to host this you'll have to host it yourself. 

## Running an instance
You need to have an postgres server you can connect to, its possible to run it locally. For more information look for documentation made for your disered platform.

### Requirements
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/) (Optional but recommended)
* [Postgresql](https://www.postgresql.org/download/)

First run these commands: 
#### Bash (Mac os/Linux)
```bash
git clone https://github.com/Floor-Gang/faq-manager-rewrite.git faq-manager
cd faq-manager
cp config.example.yml config.yml
```


#### CMD (Windows)
```bash
git clone https://github.com/Floor-Gang/faq-manager-rewrite.git faq-manager
cd faq-manager
copy config.example.yml config.yml
```

After that fill out config.yml with your discord token etc...
Once you've completed that you need to install the required libraries by running `yarn install` or `npm install`. 
Now we can run the bot with `yarn start` or `npm run start`. For the list of commands just run the help command. 

