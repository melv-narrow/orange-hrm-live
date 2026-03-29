import * as allure from 'allure-js-commons';

type Severity = Parameters<typeof allure.severity>[0];

interface AllureMetadata {
  epic: string;
  feature: string;
  story: string;
  severity: Severity;
  tags: string[];
  owner?: string;
}

export async function applyAllureMetadata({
  epic,
  feature,
  story,
  severity,
  tags,
  owner = 'Melvin Mpolokeng',
}: AllureMetadata): Promise<void> {
  await allure.epic(epic);
  await allure.feature(feature);
  await allure.story(story);
  await allure.severity(severity);
  await allure.owner(owner);
  await allure.tags(...tags);
}
