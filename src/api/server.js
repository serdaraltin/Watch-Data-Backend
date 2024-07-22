const { express, helmet, bodyParser, cors, morgan} = require("./imports/serverimport.js")
const { notification, report, dashboard, camera, admin, company, branch, user } = require("./imports/apisimport");


const app = express();
app.use(express.urlencoded({extended:false}));

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.use(admin)
app.use(notification)
app.use(report);
app.use(dashboard);
app.use(camera);
app.use(company);
app.use(branch);
app.use(user);

module.exports = app;