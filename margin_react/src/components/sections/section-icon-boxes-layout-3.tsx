import { motion } from "framer-motion";
import IconBox from "@/components/icon-box";
import SectionTitle from "./section-title";

export const iconBoxes = [
  {
    icon: "icons/deadline-5926_5778aee2-b372-4b21-94a1-c9fc06ac464c.svg",
    title: "Fast Results",
    description:
      "We also provide tangible results and measurable long-term value business.",
  },
  {
    icon: "icons/medal-3141_6860a6ec-597a-49e1-a5d2-dd4b070acef3.svg",
    title: "Award Winning Agency",
    description:
      "We also provide tangible results and measurable long-term value business.",
  },
  {
    icon: "icons/medical-research-6506_05214fe4-cb2e-4171-ac03-72168bf2981b.svg",
    title: "Competition Analysis",
    description:
      "We also provide tangible results and measurable long-term value business.",
  },
  {
    icon: "icons/customer-support-4912_a5517329-a472-47b5-8155-d507da181405.svg",
    title: "Friendly Customer Support",
    description:
      "We also provide tangible results and measurable long-term value business.",
  },
  {
    icon: "icons/pay-2643_cf4ecaa0-bcfb-4c2b-91e1-7353cb0dccdd.svg",
    title: "100% Money Back Guarantee",
    description:
      "We also provide tangible results and measurable long-term value business.",
  },
  {
    icon: "icons/handshake-3124_670c4553-214a-4d06-830f-4d0855736c60.svg",
    title: "Customer Loyalty",
    description:
      "We also provide tangible results and measurable long-term value business.",
  },
];

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 60,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

const SectionIconBoxesLayout3 = ({ noTitle }: { noTitle?: boolean }) => {
  return (
    <section className="pb-10 pt-16 lg:pb-20 lg:pt-24">
      <div className="container">
        {!noTitle && (
          <SectionTitle
            subtitle="We offer a variety of services here to get you started and successfully suite every need using Margin."
            sectionClasses="mx-auto max-w-xl text-center mb-12"
            titleClasses="mb-3 text-center"
            subtitleClasses="text-md font-medium"
          >
            Top 6 reasons why we are the best
          </SectionTitle>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-10">
          {iconBoxes.map((iconBox, index) => {
            return (
              <motion.div
                key={index}
                variants={fadeInAnimationVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{
                  delay: 0.5,
                }}
                custom={index}
              >
                <IconBox
                  iconBox={iconBox}
                  className="py-7 text-center shadow-none before:hidden"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionIconBoxesLayout3;
