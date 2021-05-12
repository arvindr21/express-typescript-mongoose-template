import * as express from "express";
import * as bodyParser from "body-parser";
import { ContactRoutes } from "./routes/contact.routes";
import { AppRoutes } from "./routes/app.routes";
import * as mongoose from "mongoose";


class App {
	public mongoUrl: string = 'mongodb://localhost/contacts';
	public app: express.Application;
	public contactRoutePrv: ContactRoutes = new ContactRoutes();
	public appRoutePrv: AppRoutes = new AppRoutes();

	constructor() {
		this.app = express();
		this.config();
		this.mongoSetup();
		this.contactRoutePrv.routes(this.app);
		this.appRoutePrv.routes(this.app);
	}

	private config(): void {
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
	}

	private mongoSetup(): void {
		mongoose.connect(this.mongoUrl, {
			useUnifiedTopology: true,
			useNewUrlParser: true
		});
	}
}

export default new App().app;