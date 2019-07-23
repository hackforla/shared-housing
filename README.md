Shared Housing Project
===

![GitHub issues](https://img.shields.io/github/issues/hackforla/shared-housing.svg)

# Table of Contents
- [About Hack for LA](#hackforla)
- [About LA Family Housing](#lafamilyhousing)
- [Homeless Crisis](#homelesscrisis)
    - [Demographics](#demographics)
- [Project Overview](#projectoverview)
    - [Process Flow](#processflow)
    - [Project Timeline](#projecttimeline)
- [Getting Started](#gettingstarted)
- [References](#references)
- [License](#license)


## About Hack For LA <a name="hackforla"></a>
Hack for LA is a project group of HackerFund and the official Los Angeles chapter of Code for America. We bring together coders, designers, entrepreneurs, students, government stagg, activists and other civic-minded people to solve LA region's biggest challenges.

You can learn more about us at our [website](https://www.hackforla.org)

## About LA Family Housing <a name="lafamilyhousing"></a>
LA Family Housing (LAFH) is a non-profit organization that helps people transition out of homelessness and proverty through a continuum of housing enriched with supportive services. Our vision is to be a leader in providing solutions to end homelessness.

We operate 26 properties of temporary, permanently affordable, and permanent supportive housing accross Los Angeles, with headquarter and most services based in the San Fernando Valley.

You can learn more about us at our [website](https:/lafh.org)

## Homelessness Crisis: Demographics & Statistics <a name="homelesscrisis"></a>
According to the [Los Angeles Homeless Service Authority](https://www.lahsa.org/), in 2019, approximately 50,000 to 60,000 persons may be found homeless on any given night in Los Angeles County, a 12% increase from 2018.

#### Demographics(LA County) <a name="demographics"></a>

- 75% are unsheltered
- 67% identify as male, 31% identify as female, 2% identify as transgender, and 0.3% identify as gender non-conforming.
- 25% self-report experiencing serious mental inllness
- 15% are families (those in family units)
- 15% are under the age of 24(9% are under the age of 18)
- 15% self-report a substance abuse disorder
- 7% are veterans
- 6% became homeless due to fleeing domestic or intimate partner violence

source [www.lahsa.org](http://www.lahsa.org)


Project Overview <a name="projectoverview"></a>
---
#### Slide Deck
Review the project overview slide deck here for detailed context: https://drive.google.com/open?id=1ZyUEjJqntZQ5SeTuT9m4hoDXytujzcmd

#### Background & Client Request
LA Family Housing engaged the help fo Hack for LA organization to identify and design a more efficient & effective solution for matching multiple individuals who experience homelessness as potential co-tenants and placing the matched individuals in suitable shared housing units.

#### Current Matching Process - Pain Points

- Process is manual (vetting & matching is done manually, via discussions among case managers)
- Process takes too long (~1 month from unit identification to lease signing)
- Eligibility criteria are not clearly defined (what criteria make for a successfull tenant match?)


Process flow (Current) <a name="processflow"></a>
---

![Current Process](https://github.com/hackforla/shared-housing/blob/master/public/CurrentProcess.png)


> Read more about sequence-diagrams here: http://bramp.github.io/js-sequence-diagrams/

Project Timeline (Rough Estimate) <a name="projecttimeline"></a>
---

![Current Process](https://github.com/hackforla/shared-housing/blob/master/public/ProjectTimeline.png)

> Read more about mermaid diagrams here: http://knsv.github.io/mermaid/

Getting Started <a name="gettingstarte"></a>
---

To get a started working on this project you will need to do the following
 - Fork this repo to your local repository
 - Pull your download your forked copy onto your local development environment
 - Open terminal and follow the list of the commands
 
   ```
    cd client/
    npm install
   ```
   Once all packages are added you can star the project
   ```
    npm run dev
   ```
   The project also support [storybook](https://storybook.js.org/docs/guides/guide-react/) to allow for viewing components in isolation from the project
   ```
    npm run storybook
   ```
   
## References <a name="references"></a>
- [A Faster, More Cost-Effective Solution to Homelessness](https://medium.com/@mikeboninla/shared-housing-a-faster-more-cost-effective-solution-to-homelessness-93f20a0e0906)
- [Tech tool for affordable housing](https://www.marketplace.org/2019/02/21/los-angeles-homeless-advocates-have-new-tech-tool-affordable-housing/)
- [Alternative housing review](http://ciesandiego.org/wp-content/uploads/2018/08/SAMHSA-Shared-Housing-Alt-Housing-PPT_7_23_18-_FinalPDF.pdf)
- [Can tech fix housing market?](https://www.nytimes.com/2019/01/29/upshot/can-technology-help-fix-the-housing-market.html)

## License <a name="license"></a>


Licensed Under: [GNU General Public License v3.0](https://github.com/hackforla/shared-housing/blob/master/LICENSE)

