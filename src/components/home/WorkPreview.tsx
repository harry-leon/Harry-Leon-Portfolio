"use client"

import { motion } from "framer-motion"
import ViewAllHeader from "@/components/ViewAllHeader"
import WorkItem from "@/components/WorkItem"
import { homeIntroConfig } from "@/data/content"
import { WorkItemProps } from "@/lib/types"
import { sortWorkItems } from "@/lib/utils"
import { fadeUpVariants, staggerContainerVariants, staggerItemVariants } from "./animations"

interface WorkPreviewProps {
  work: WorkItemProps[]
}

export default function WorkPreview({ work }: WorkPreviewProps) {
  const items = sortWorkItems(work, "newest").slice(0, homeIntroConfig.workItemsToShow)

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} className="mt-20">
      <ViewAllHeader title="Education & Training" pageUrl="/work" itemCount={work.length} />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainerVariants}
        className="grid gap-4"
      >
        {items.map((job, i) => (
          <motion.div key={i} variants={staggerItemVariants}>
            <WorkItem {...job} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
