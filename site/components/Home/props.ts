import { GetStaticProps, GetStaticPropsResult } from "next"
import { Props as JobProps } from "../../components/Job"
import { Props as SocialProps } from "../../components/Social"

export type props = {
  jobs: Omit<JobProps, "location" | "theme">[]
  socials: Omit<SocialProps, "theme">[]
}

export const getStaticProps: GetStaticProps<props> = async context => {

  const props: props = {
    jobs: [ 
      {
        title: "Senior Engineering Manager",
        company: "Strava",
        companyUrl: "https://strava.com",
        period: "January 2023 - Present"
      },
      {
        title: "Head of Mobile",
        company: "FATMAP",
        companyUrl: "https://fatmap.com",
        period: "January 2022 - December 2022"
      },
      {
        title: "VP of Engineering",
        company: "Sport Heroes",
        companyUrl: "https://sportheroes.com",
        period: "October 2020 - December 2021"
      },
      {
        title: "CTO",
        company: "Floom",
        companyUrl: "https://floomx.com",
        period: "Sept 2018 - Dec 2019"
      },
      {
        title: "Senior Software Engineer",
        company: "Citymapper",
        companyUrl: "https://citymapper.com",
        period: "Oct 2016 - Mar 2018"
      },
      {
        title: "Head of\nMobile",
        company: "Dojo",
        period: "Mar 2016 - Sep 2016"
      },
      {
        title: "Android\nDeveloper",
        company: "Dojo",
        period: "Jan 2015 - Feb 2016"
      }
    ],
    socials: [
      {
        title: "theo@theo.dev",
        url: "mailto:theo@theo.dev?subject=Hello Theo"
      },
      {
        title: "Github",
        url: "https://github.com/theostanton"
      },
      {
        title: "LinkedIn",
        url: "https://linkedin.com/in/theostanton"
      },
      {
        title: "Instagram",
        url: "https://instagram.com/theostanton"
      },
      {
        title: "Strava",
        url: "https://www.strava.com/athletes/theostanton"
      }
    ]
  }

  return {
    props
  } as GetStaticPropsResult<props>
}
