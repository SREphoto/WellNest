import SwiftUI

struct WatchView: View {
    @StateObject private var circleManager = CircleManager.shared
    
    var body: some View {
        ScrollView {
            VStack(spacing: 10) {
                Text("Your Circle")
                    .font(.headline)
                    .padding(.top, 10)

                ForEach(circleManager.users) { user in
                    HStack {
                        Image(systemName: user.moodIcon)
                            .foregroundColor(user.score > 50 ? .blue : .red)
                        Text(user.name)
                            .font(.system(size: 14))
                        Spacer()
                    }
                    .padding(.horizontal)
                }
            }
        }
        .navigationTitle("WellNest")
    }
}

struct WatchView_Previews: PreviewProvider {
    static var previews: some View {
        WatchView()
    }
}
