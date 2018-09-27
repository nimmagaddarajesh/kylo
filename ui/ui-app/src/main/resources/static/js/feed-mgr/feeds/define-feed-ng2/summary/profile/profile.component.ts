import {Component, OnInit} from "@angular/core";
import {StateService} from "@uirouter/angular";
import {DefineFeedService} from "../../services/define-feed.service";
import {AbstractLoadFeedComponent} from "../../shared/AbstractLoadFeedComponent";
import {FeedLoadingService} from "../../services/feed-loading-service";
import {FeedSideNavService} from "../../shared/feed-side-nav.service";

@Component({
    selector: "define-feed-profile",
    styleUrls: ["profile.component.scss"],
    templateUrl: "profile.component.html"
})
export class ProfileComponent extends AbstractLoadFeedComponent implements OnInit {

    static LOADER = "ProfileComponent.LOADER";

    static LINK_NAME = "Profile"

    constructor(feedLoadingService: FeedLoadingService, stateService: StateService, defineFeedService: DefineFeedService, feedSideNavService:FeedSideNavService) {
        super(feedLoadingService, stateService, defineFeedService, feedSideNavService);
    }

    getLinkName(){
        return ProfileComponent.LINK_NAME;
    }

    init() {

    }
}

