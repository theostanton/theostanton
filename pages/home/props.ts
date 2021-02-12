import { GetStaticProps, GetStaticPropsResult } from "next"
import { Props as JobProps } from "../../components/Job"
import { Props as SocialProps } from "../../components/Social"

export type Props = {
  jobs: Omit<JobProps, "location" | "theme">[]
  socials: Omit<SocialProps, "theme">[]
}

export const getStaticProps: GetStaticProps<Props> = async context => {

  const props: Props = {
    jobs: [
      {
        title: "Head of Engineering",
        company: "Sport Heroes",
        companyUrl: "https://sportheroes.com",
        period: "October 2020 - Present"
      },
      {
        title: "CTO",
        company: "Floom",
        companyUrl: "https://floomx.com",
        description: "◍ Some other description",
        period: "2020"
      },
      {
        title: "Senior Software Engineer",
        company: "Citymapper",
        companyUrl: "https://citymapper.com",
        period: "2018"
      },
      {
        title: "Head of\nProduct",
        company: "Dojo",
        period: "2017"
      },
      {
        title: "Android\nDeveloper",
        company: "Dojo",
        period: "2016"
      }
    ],
    socials: [
      {
        title: "Email",
        url: "mailto:theo@theo.dev?subject=Hello Theo"
      },
      {
        title: "Instagram",
        url: "https://instagram.com/theostanton"
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
        title: "Strava",
        url: "https://www.strava.com/athletes/4142500"
      }
    ]
  }

  return {
    props
  } as GetStaticPropsResult<Props>
}
