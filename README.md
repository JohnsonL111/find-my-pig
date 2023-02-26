CMPT 272 Final Project

> Help your buddy Farmer Hogget find his missing pigs!
## Deployment

**Development**:
```bash
> # start from any base directory
> git clone git@github.com:JohnsonL111/pig-location-tracker.git
> cd pig-location-tracker/pig-location-tracker # (yup, twice 🙃)
> npm install # downloads dependencies
> ng serve # runs dev server on http://localhost:4200/ in your default browser
```
### Changing default dev server port
- If port 4200 is already taken you can launch the server on another port by specifying it as an option:
```bash
> ng serve --port 4201 # or any other port
```
- You can also specify a new npm script option in `package.json` below:
```json
    "scripts": {
        "start" : "ng serve --port 4201"
    }
```
- and run using `npm start`

**Production**: https://pig-reporting-application.netlify.app/ 

## Functionality
> Password for delete and update are `Oink!!` (case sensitive)

- Supports CRUD operations for missing pig reports
1. Add a missing pig report
2. Edit a missing pig report
3. Delete a missing pig report
4. Update the status of a missing pig report (one way only i.e., from MISSING -> RETRIEVED)


