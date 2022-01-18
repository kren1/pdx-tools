import Link from "next/link";
import React from "react";

export const UploadFaq: React.FC<{}> = () => {
  return (
    <dl>
      <dt>What files can I upload?</dt>
      <dd>
        Any EU4 save that can be understood: normal games, multiplayer games,
        ironman games with and without achievement compatibility. Even modded
        games can be uploaded, though support for those can be limited.
      </dd>
      <dt>Can I delete files I upload?</dt>
      <dd>
        Yes you are free to do with the saves as you please. After deleting a
        save it will no longer be accessible to you or others. You can choose to
        reupload it at a later date, but it won't be accessible at the previous
        URL.
      </dd>
      <dt>Can I download a file on Rakaly and continue it locally?</dt>
      <dd>
        Yes! In fact, Rakaly losslessly re-encodes saves with a higher
        compression ratio so downloaded saves will be smaller than the original.
      </dd>
      <dt>What are there limits on uploads?</dt>
      <dd>
        Compressed saves must not exceed 20MB and 200MB when uncompressed. Every
        Rakaly user has 100 save slots available. Achievement compatible saves
        that complete an achievement in a top 10 record time (the number of days
        since 1444 dated at the latest date of the save), do not consume a save
        slot.
      </dd>
      <dt>Can I get on an achievement leaderboard with an older patch?</dt>
      <dd>
        Yes, except that older patches are eligible at an increasing 10% tax to
        the number of days since 1444 to complete the achievement. For instance,
        if 1.31 is the latest patch then saves uploaded on 1.29 will have a 20%
        tax. Whenever a new patch is released, older patches have their tax rate
        increased. This is to facilitate leaderboard freshness so that new runs,
        with all the bugfixes and balancing changes brought by patches, are
        feasible.
      </dd>
      <dt>My save has achievements that aren't recognized</dt>
      <dd>
        Not all achievements are implemented in Rakaly. Just like how the game
        devs have to implement logic to check if achievement conditions have
        been satisfied, so does Rakaly. Here's{" "}
        <Link href="/eu4/achievements">
          <a>a list of all implemented achievements</a>
        </Link>
        . The good news is that community input greatly impacts what
        achievements get implemented and custom achievements can be made too!
        Note that achievements are not backdated, so achievements that are
        gained but then "lost" (ie: tag switching, vassal annexation, etc) won't
        be detected.
      </dd>
      <dt>What happens to runs where I gain multiple achievements?</dt>
      <dd>
        It is recommended that when an achievement is completed, to save the
        game and upload it at that point. Only the earliest instance of a
        completed achievement will be used for each achievement leaderboard, so
        if one finds a save from that run from an earlier date, it can be
        uploaded without using a save slot, and the earlier completion date will
        knock the old save off the leaderboard.
      </dd>
      <dt>Can I mark the uploaded files as private?</dt>
      <dd>No, all uploaded files are public.</dd>
      <dt>I have a suggestion or a question that isn't answered here</dt>
      <dd>
        Feel free to get in contact via{" "}
        <a href="https://discord.gg/rCpNWQW">Discord</a> or email hi [(at)]
        rakaly.com
      </dd>

      <style jsx>{`
        dt {
          font-weight: bold;
        }
      `}</style>
    </dl>
  );
};
