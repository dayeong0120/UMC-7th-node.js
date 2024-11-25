-- DropForeignKey
ALTER TABLE `mission` DROP FOREIGN KEY `mission_restaurant_id_fkey`;

-- DropForeignKey
ALTER TABLE `restaurant` DROP FOREIGN KEY `restaurant_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_user_mission_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_mission` DROP FOREIGN KEY `user_mission_mission_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_mission` DROP FOREIGN KEY `user_mission_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_prefer` DROP FOREIGN KEY `user_prefer_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_prefer` DROP FOREIGN KEY `user_prefer_user_id_fkey`;
